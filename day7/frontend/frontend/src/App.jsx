import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);

  const testApi = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes);
    // console.log(res.data.notes); 
  };

  useEffect(() => {
    testApi();
  }, []);
  return (
    <div className="main">
      {notes.map((val, idx) => {
        return (
          <div key={idx} className="note">
            <h1>{val.title}</h1>
            <p>{val.description}</p>
          </div>
        );
      })}
    </div>
  );
}
