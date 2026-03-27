import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Feed from "./features/post/pages/feed";
import CreatePost from "./features/post/pages/CreatePost";
import Profile from "./features/Profile/pages/Profile";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Feed/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
    {
    path:"/register",
    element:<RegisterPage/>
  },
  {
    path:"/create-post",
    element:<CreatePost/>
  },
    {
    path:"/profile",
    element:<Profile/>  }
])