import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../page/login";
import RegisterPage from "../page/register";
import {Page404} from "../page/404";
import CoursesPage from "../page/courses";
import CourseInfoPage from "../page/course-info";
import AdminCourseEditorPage from "../page/admin-course-editor";
import AdminCoursesPage from "../page/admin-courses";
import HomePage from "../page/home";
import ProfilePage from "../page/talent-account/profile";
import FavoriteCoursesPage from "../page/talent-account/favorites";
import TalentNotificationsPage from "../page/talent-account/notifications";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <HomePage/>
        ),
    },
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
            <ProfilePage/>
        ),
    },
    {
        path: "/profile/favorites",
        element: (
            <FavoriteCoursesPage/>
        ),
    },
    {
        path: "/profile/notifications",
        element: (
            <TalentNotificationsPage/>
        ),
    },
    {
        path: "/courses",
        element: (
            <CoursesPage/>
        ),
    },
    {
        path: "/courses/:courseId",
        element: (
            <CourseInfoPage/>
        ),
    },
    {
        path: "/admin/courses/:courseId",
        element: (
            <AdminCourseEditorPage/>
        ),
    },
    {
        path: "/admin/courses",
        element: (
            <AdminCoursesPage/>
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