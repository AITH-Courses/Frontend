import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <LoginPage/>
        ),
    },
    {
        path: "/register",
        element: (
            <RegisterPage/>
        ),
    },
]);

export default router;