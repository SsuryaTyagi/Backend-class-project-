import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from "./features/auth/pages/login.jsx";
import Register from "./features/auth/pages/register.jsx";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}
