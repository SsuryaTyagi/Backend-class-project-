import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const [follower, setFollower] = useState("");
  const [followings, setFollowings] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{
        follower,
        loading,
        followings,
        setFollower,
        setLoading,
        setFollowings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
