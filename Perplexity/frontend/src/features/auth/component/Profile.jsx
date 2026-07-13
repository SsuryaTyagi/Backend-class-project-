// Profile.jsx
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { User, Mail } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null // or a small skeleton/loading state

  return (
    <div className="text-[#D4AF37] flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#1a1a1c] flex items-center justify-center">
        <User size={18} />
      </div>
      <div className="flex flex-col leading-tight">
        <p className="font-semibold flex items-center gap-1">
          {user.username}
        </p>
        <p className="text-xs text-[#D4AF37]/70 flex items-center gap-1">
          <Mail size={12} />
          {user.email}
        </p>
      </div>
    </div>
  )
}