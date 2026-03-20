import React, { createContext, useState } from "react";

export const postContext = createContext();
export default function PostProvider({ children }) {
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <postContext.Provider value={{ post, loading,feed, setFeed, setPost, setLoading }}>
      {children}
    </postContext.Provider>
  );
}
