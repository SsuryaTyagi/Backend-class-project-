import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState(null);
  const [editDescription, setEditDescription] = useState("")

  const testApi = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes);
    // console.log(res.data.notes);
  };
  useEffect(() => {
    testApi();
  }, []);

  // sumbit login
  async function handleSumbit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    // console.log(title.value, description.value);

    const res = await axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value,
    });
    console.log(res.data);
    testApi();

    title.value = "";
    description.value = "";
  }

  // delete api
  async function handleDelete(id) {
    const res = await axios.delete("http://localhost:3000/notes/" + id);
    console.log(res.data);
    console.log(id);

    testApi();
  }
function handleUpdate(note) {
  setUpdate(note._id);
  setEditDescription(note.description);
}
async function handleSave(id) {
  await axios.patch("http://localhost:3000/notes/" + id, {
    description: editDescription
  });

  setUpdate(null);
  setEditDescription("");
  testApi();
}


  return (
    <div className="main">
      <form className="form" onSubmit={handleSumbit}>
        <input name="title" type="text" placeholder="Enter notes" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>submit</button>
      </form>
{notes.map((val) => {
  return (
    <div key={val._id} className="note">
      <h1>{val.title}</h1>

      {update === val._id ? (
        <>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={() => handleSave(val._id)}>
            Save
          </button>
          <button onClick={() => setUpdate(null)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{val.description}</p>
          <button onClick={() => handleUpdate(val)}>
            Update
          </button>
          <button onClick={() => handleDelete(val._id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
})}

    </div>
  );
}
