import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

const {
  PORT = 3001,
  FRONTEND_URL,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  MOCK_PAYMENTS,
  DEMO_MODE,
  NODE_ENV,
} = process.env

const mockPayments = MOCK_PAYMENTS === 'true'

if (!FRONTEND_URL || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing values in backend/.env. Check FRONTEND_URL, SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  process.exit(1)
}

if (mockPayments && NODE_ENV === 'production' && DEMO_MODE !== 'true') {
  console.error('MOCK_PAYMENTS must not be enabled in production. Set DEMO_MODE=true only for demos.')
  process.exit(1)
}

const HOLD_MINUTES = 30
const TIMES = ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00']
const ONLINE_METHODS = ['gcash', 'card']
const ALL_METHODS = ['gcash', 'card', 'cash']
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const app = express()
app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

const createCheckout = async (reservation) => {
  if (mockPayments) {
    return `${FRONTEND_URL}/mock-payment?reservation=${reservation.id}`
  }

  throw new Error('No payment gateway is configured.')
}

app.get('/api/health', async (req, res) => {
  const { count, error } = await supabase
    .from('restaurant_tables')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return res.status(500).json({ ok: false, error: error.message })
  }

  res.json({ ok: true, tables: count, mockPayments })
})

app.post('/api/reservations', async (req, res) => {
  const b = req.body || {}
  const tableId = Number(b.tableId)
  const guests = Number(b.guests)
  const date = b.date
  const time = b.time
  const paymentMethod = b.paymentMethod
  const name = String(b.fullName ?? '').trim()
  const phone = String(b.phone ?? '').trim()
  const email = String(b.email ?? '').trim()
  const requests = String(b.requests ?? '').trim()

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' })

  const invalid = (message) => res.status(400).json({ error: message })

  if (!Number.isInteger(tableId) || !Number.isInteger(guests) || guests < 1) {
    return invalid('Invalid table or number of guests.')
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today) {
    return invalid('Please choose a valid date.')
  }
  if (!TIMES.includes(time)) return invalid('Please choose a valid time.')
  if (!ALL_METHODS.includes(paymentMethod)) return invalid('Invalid payment method.')
  if (!name || name.length > 100) return invalid('Please enter a valid name.')
  if (!phone || phone.length > 30) return invalid('Please enter a valid phone number.')
  if (email.length > 120 || requests.length > 500) return invalid('Some details are too long.')

  const { data: table } = await supabase
    .from('restaurant_tables')
    .select('id, seats')
    .eq('id', tableId)
    .maybeSingle()

  if (!table) return invalid('That table does not exist.')
  if (guests > table.seats) return invalid('That table does not have enough seats.')

  const { data: reservation, error: insertError } = await supabase
    .from('reservations')
    .insert({
      table_id: tableId,
      reservation_date: date,
      reservation_time: time,
      guests,
      customer_name: name,
      phone,
      email: email || null,
      requests: requests || null,
      payment_method: paymentMethod,
    })
    .select('id')
    .single()

  if (insertError) {
    if (insertError.code === '23505') {
      return res.status(409).json({ error: 'table_taken' })
    }
    console.error(insertError)
    return res.status(500).json({ error: 'Could not save the reservation.' })
  }

  if (!ONLINE_METHODS.includes(paymentMethod)) {
    return res.json({ id: reservation.id, checkoutUrl: null })
  }

  try {
    const checkoutUrl = await createCheckout(reservation)
    res.json({ id: reservation.id, checkoutUrl })
  } catch (err) {
    console.error('Checkout error:', err.message)

    await supabase
      .from('reservations')
      .update({ status: 'Cancelled' })
      .eq('id', reservation.id)

    res.status(502).json({ error: 'Could not start the payment. Please try again.' })
  }
})

app.get('/api/reservations/:id', async (req, res) => {
  if (!UUID_RE.test(req.params.id)) {
    return res.status(404).json({ error: 'not_found' })
  }

  const { data } = await supabase
    .from('reservations')
    .select(
      'customer_name, table_id, guests, reservation_date, reservation_time, payment_method, payment_status, status'
    )
    .eq('id', req.params.id)
    .maybeSingle()

  if (!data) return res.status(404).json({ error: 'not_found' })

  res.json(data)
})

const requireMock = (req, res, next) => {
  if (!mockPayments || !UUID_RE.test(req.params.id)) {
    return res.status(404).json({ error: 'not_found' })
  }
  next()
}

app.post('/api/mock-payment/:id/pay', requireMock, async (req, res) => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ payment_status: 'Paid' })
    .eq('id', req.params.id)
    .eq('status', 'Reserved')
    .eq('payment_status', 'Pending')
    .in('payment_method', ONLINE_METHODS)
    .select('id')

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not record the payment.' })
  }

  if (!data || data.length === 0) {
    return res.status(409).json({
      error: 'This payment is no longer available. The table hold may have expired.',
    })
  }

  res.json({ ok: true })
})

app.post('/api/mock-payment/:id/cancel', requireMock, async (req, res) => {
  const { error } = await supabase
    .from('reservations')
    .update({ status: 'Cancelled' })
    .eq('id', req.params.id)
    .eq('status', 'Reserved')
    .eq('payment_status', 'Pending')
    .in('payment_method', ONLINE_METHODS)

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could not cancel.' })
  }

  res.json({ ok: true })
})

const releaseUnpaid = async () => {
  const cutoff = new Date(Date.now() - HOLD_MINUTES * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('reservations')
    .update({ status: 'Cancelled' })
    .eq('status', 'Reserved')
    .eq('payment_status', 'Pending')
    .in('payment_method', ONLINE_METHODS)
    .lt('created_at', cutoff)

  if (error) console.error('Could not release unpaid reservations:', error)
}

setInterval(releaseUnpaid, 60 * 1000)
releaseUnpaid()

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
  if (mockPayments) console.log('MOCK PAYMENTS ARE ON (test mode only)')
})