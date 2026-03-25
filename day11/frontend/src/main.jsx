import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./style.scss";
import AuthProvider from "./features/auth/auth.context.jsx";
import PostProvider from "./features/post/post.context.jsx";
import UserProvider from "./features/user/user.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </AuthProvider>,
);
