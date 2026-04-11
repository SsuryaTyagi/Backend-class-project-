import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/RegisterPage"
import LoginPage from "./features/auth/pages/LoginPage";
import Protected from "./features/auth/component/Protected";
import Home from "./features/home/pages/Home";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Protected><Home/></Protected>
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