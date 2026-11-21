import React, { useState } from 'react'
import { FaSearch, FaPlus, FaPen, FaTrash, FaEnvelope, FaPhone } from 'react-icons/fa'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const initialStaff = [
  { id: 1, name: 'Guia Joy Gimoto', position: 'Restaurant Manager', email: 'guia@hukbalajadia.com', phone: '+63 917 111 2233' },
  { id: 2, name: 'Arron Chester Roadiel', position: 'Head Chef', email: 'arron@hukbalajadia.com', phone: '+63 918 222 3344' },
  { id: 3, name: 'Aldrid Carcosia', position: 'Host', email: 'aldrid@hukbalajadia.com', phone: '+63 919 333 4455' },
  { id: 4, name: 'Sophia Rowe Nadezhda', position: 'Server', email: 'sophia@hukbalajadia.com', phone: '+63 920 444 5566' },
  { id: 5, name: 'Ansherina Mongcal', position: 'Server', email: 'ansherina@hukbalajadia.com', phone: '+63 921 555 6677' },
  { id: 6, name: 'Jonard Bartolome', position: 'Barista', email: 'jonard@hukbalajadia.com', phone: '+63 922 666 7788' },
]

const emptyForm = { name: '', position: '', email: '', phone: '' }

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

const inputClass =
  'w-full rounded-xl border border-[#CFCBC5] px-4 py-3 text-sm outline-none focus:border-[#CCA45E]'

const StaffManagement = () => {
  const [staff, setStaff] = useState(initialStaff)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const visible = staff.filter((person) => {
    const text = query.toLowerCase()
    return (
      person.name.toLowerCase().includes(text) ||
      person.position.toLowerCase().includes(text)
    )
  })

  const openAdd = () => {
    setForm(emptyForm)
    setModal({ mode: 'add' })
  }

  const openEdit = (person) => {
    setForm({
      name: person.name,
      position: person.position,
      email: person.email,
      phone: person.phone,
    })
    setModal({ mode: 'edit', id: person.id })
  }

  const closeModal = () => setModal(null)

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()

    if (modal.mode === 'add') {
      setStaff((current) => [...current, { id: Date.now(), ...form }])
    } else {
      setStaff((current) =>
        current.map((person) =>
          person.id === modal.id ? { ...person, ...form } : person
        )
      )
    }

    closeModal()
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      setStaff((current) => current.filter((item) => item.id !== person.id))
    }
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-6 md:px-16 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-3">
            STAFF DASHBOARD
          </p>
          <h1 className="text-[#26221E] text-4xl md:text-5xl" style={serif}>
            Staff Management
          </h1>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#A18D76]" />
            <input
              type="text"
              placeholder="Search staff by name or position..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-[#CFCBC5] bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#CCA45E]"
            />
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 rounded-full bg-[#CCA45E] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-colors hover:bg-[#B88D45]"
          >
            <FaPlus className="text-xs" />
            Add Staff
          </button>
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-[#A18D76]">
            No staff found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((person) => (
              <div
                key={person.id}
                className="rounded-[24px] border border-[#E8E3DB] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-5 pb-5 border-b border-[#E8E3DB]">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F0E5D1] text-3xl text-[#8A6420]"
                    style={serif}
                  >
                    {getInitials(person.name)}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-2xl text-[#26221E]" style={serif}>
                      {person.name}
                    </h2>
                    <p className="text-xs tracking-[2px] uppercase text-[#C99B52] mb-2">
                      {person.position}
                    </p>
                    <p className="flex items-center gap-2 truncate text-sm text-[#756D64]">
                      <FaEnvelope className="shrink-0 text-xs" />
                      {person.email}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-[#756D64]">
                      <FaPhone className="shrink-0 text-xs" />
                      {person.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => openEdit(person)}
                    className="flex items-center gap-2 rounded-full border border-[#CFCBC5] px-5 py-2 text-sm text-[#26221E] transition-colors hover:border-[#CCA45E]"
                  >
                    <FaPen className="text-xs" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(person)}
                    className="flex items-center gap-2 rounded-full border border-[#CFCBC5] px-5 py-2 text-sm text-[#9B2C2C] transition-colors hover:border-[#9B2C2C]"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          onClick={closeModal}
        >
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[28px] bg-white px-8 py-8"
          >
            <h2 className="mb-6 text-3xl text-[#26221E]" style={serif}>
              {modal.mode === 'add' ? 'Add Staff' : 'Edit Staff'}
            </h2>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-semibold text-[#26221D]">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-semibold text-[#26221D]">
                Position
              </label>
              <input
                type="text"
                value={form.position}
                onChange={(e) => handleChange('position', e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-semibold text-[#26221D]">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="mb-7">
              <label className="mb-2 block text-xs font-semibold text-[#26221D]">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 rounded-full border border-[#CFCBC5] py-3 text-sm text-[#756D64] transition-colors hover:border-[#CCA45E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-[#CCA45E] py-3 text-sm font-medium text-black transition-colors hover:bg-[#B88D45]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default StaffManagement