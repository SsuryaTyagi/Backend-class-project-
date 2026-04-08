import React, { useState } from "react";
import "../../auth/Style/style.scss";
import { useNavigate } from "react-router-dom";
import Input from "../component/Input";
import Button from "../component/Button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

 const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(email,password,name);

    setEmail("");
    setPassword("");
    setName("");
 }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />

        <Button text="Register" type="submit" />

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}
