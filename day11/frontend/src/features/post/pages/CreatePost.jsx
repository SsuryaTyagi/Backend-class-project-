import React, { useRef, useState } from "react";
import "../style/createPost.scss";
import { userPost } from "../hooks/userPost";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const postImageInputFild = useRef(null);
  const navigate = useNavigate()

  const { loading, handleCreatePost } = userPost();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const file = postImageInputFild.current.files[0];

    await handleCreatePost(caption, file)
    navigate("/")

     setCaption("");
  };

  if (loading) {
    return <h1>createPost</h1>
  }

  return (
    <div className="createPost">
      <div className="form">
        <h2>Create New Post</h2>

        <input
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          type="text"
          placeholder="Write a caption..."
        />

        <input ref={postImageInputFild} type="file" />

        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
}
