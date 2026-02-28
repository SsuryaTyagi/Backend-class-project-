import React from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className="main">
      <div className="form-container">
        <h1>Register</h1>

        <form className="form">
          <input type="text" placeholder="Enter username" />
          <input type="email" placeholder="Enter email" />
          <input type="password" placeholder="Enter password" />
          <button type="submit">Register</button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
