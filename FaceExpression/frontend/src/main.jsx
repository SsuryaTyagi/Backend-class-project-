import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./features/auth/auth.context.jsx";
import HomeProvider from "./features/home/home.context.jsx";

createRoot(document.getElementById("root")).render(
  <HomeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HomeProvider>,
);
