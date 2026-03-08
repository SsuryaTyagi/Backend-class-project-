import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { use } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    setPassword("");
    setUsername("");
    setEmail("")
  };

  
  return (
    <main className="main">
      <div className="form-container">
        <h1>Register</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter username"
          />
          <input
            type="email"
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
          <input
            type="password"
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
          />
          <button type="submit">Register</button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
