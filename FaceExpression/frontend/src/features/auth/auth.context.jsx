import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const authContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <authContext.Provider value={{ user, loading, error, setUser, setLoading, setError }}>
      {children}
    </authContext.Provider>
  );
}
