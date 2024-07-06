import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";
import {Page404} from "../page/404";
import UserProfilePage from "../page/user-profile";

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
    {
        path: "/profile",
        element: (
            <UserProfilePage/>
        ),
    },
    {
        path: "*",
        element: (
            <Page404/>
        )
    }
]);

export default router;