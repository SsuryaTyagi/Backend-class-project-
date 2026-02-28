import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <main className="main">
      <div className="form-container">
        <h1>Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" onInput={(e)=>{setUsername(e.target.value)}} placeholder="Enter username" />
          <input type="password" onInput={(e)=>{setPassword(e.target.value)}} placeholder="Enter password" />
          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/register">register</Link>
        </p>
      </div>
    </main>
  );
}
