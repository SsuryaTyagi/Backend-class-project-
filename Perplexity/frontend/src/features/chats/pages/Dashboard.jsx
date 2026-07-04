import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useChat } from '../hooks/useChat';


export default function Dashboard() {

  const { initializeSocketConnection } = useChat();

  const { user } = useAuth();
      console.log(user);

  React.useEffect(() => {
    initializeSocketConnection();
  }, []);

  return (
    <div>
      Welcome to the Dashboard!
    </div>
  )
}
