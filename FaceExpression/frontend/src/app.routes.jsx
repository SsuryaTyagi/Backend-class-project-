import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/RegisterPage"
import LoginPage from "./features/auth/pages/LoginPage";
import Protected from "./features/auth/component/Protected";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Protected><h1>Home Page</h1></Protected>
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