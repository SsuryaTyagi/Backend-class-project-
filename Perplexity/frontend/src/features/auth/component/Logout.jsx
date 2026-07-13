// Logout.jsx
import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Logout() {
  const { logout } = useAuth() // adjust to match your actual useAuth API

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors text-sm"
    >
      <LogOut size={16} />
      Logout
    </button>
  )
}