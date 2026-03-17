import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<h1>home page</h1>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
    {
    path:"/register",
    element:<RegisterPage/>
  }
])