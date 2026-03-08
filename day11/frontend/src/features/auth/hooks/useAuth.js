import React, { useContext } from 'react'
import { authContext } from '../auth.context.jsx'

export default function useAuth() {
  const context = useContext(authContext)

  return context
}
