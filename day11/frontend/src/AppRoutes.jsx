import React from "react";
import { Route, Routes } from 'react-router-dom';
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </div>
  );
}
