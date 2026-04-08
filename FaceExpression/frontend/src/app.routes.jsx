import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/RegisterPage"
import LoginPage from "./features/auth/pages/LoginPage";


export const router = createBrowserRouter([
    {
        path:"/",
        element:  <h1>Home Page</h1>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<LoginPage/>
    }
])