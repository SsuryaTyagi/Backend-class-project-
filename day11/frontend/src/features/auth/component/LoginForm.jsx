import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin,loading } = useAuth();
const navigate = useNavigate()

  if (loading) {
    return(
      <h1>loading....</h1>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const res = await handleLogin(username, password);
    console.log(res);
    navigate("/")

  } catch (error) {
    console.log(error);
  }

    setPassword("");
    setUsername("");
  };

  return (
    <main className="main">
      <div className="form-container">
        <h1>Login</h1>

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
            type="password"
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account?<Link to="/register">register</Link>
        </p>
      </div>
    </main>
  );
}
