import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./style.scss";
import AuthProvider from "./features/auth/auth.context.jsx";
import PostProvider from "./features/post/post.context.jsx";


createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostProvider>
    <App />
    </PostProvider>
  </AuthProvider>,
);
