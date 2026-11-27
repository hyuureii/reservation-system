import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const RequireStaff = () => {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return <p className="p-16 text-center text-[#A18D76]">Loading...</p>
  }

  if (!session) {
    return <Navigate to="/staff/login" replace />
  }

  return <Outlet />
}

export default RequireStaff