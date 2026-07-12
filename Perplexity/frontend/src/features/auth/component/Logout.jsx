import React from "react";
import { useAuth } from "../hooks/useAuth";

function Logout() {
  const { handleLogout } = useAuth();

  return <button onClick={() => handleLogout()}>Logout</button>;
}

export default Logout;
