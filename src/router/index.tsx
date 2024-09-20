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
import {Page403} from "../page/403";
import CourseRunGeneralPage from "../page/course-run/general";
import CourseRunTimetablePage from "../page/course-run/timetable";
import CourseRunMembersPage from "../page/course-run/members";
import AdminLoginPage from "../page/admin-login";
import AutoScrollArea from "../other/auto-scroll";
import CourseRunGoogleCalendarPage from "../page/course-run/google-calendar";
import CourseRunPlaylistsPage from "../page/course-run/playlists";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AutoScrollArea><HomePage/></AutoScrollArea>
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
            <AutoScrollArea><ProfilePage/></AutoScrollArea>
        ),
    },
    {
        path: "/profile/favorites",
        element: (
            <AutoScrollArea><FavoriteCoursesPage/></AutoScrollArea>
        ),
    },
    {
        path: "/profile/notifications",
        element: (
            <AutoScrollArea><TalentNotificationsPage/></AutoScrollArea>
        ),
    },
    {
        path: "/courses",
        element: (
            <AutoScrollArea><CoursesPage/></AutoScrollArea>
        ),
    },
    {
        path: "/courses/:courseId",
        element: (
            <AutoScrollArea><CourseInfoPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/login",
        element: (
            <AutoScrollArea><AdminLoginPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId",
        element: (
            <AutoScrollArea><AdminCourseEditorPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId/runs/:courseRunId",
        element: (
            <AutoScrollArea><CourseRunGeneralPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId/runs/:courseRunId/timetable",
        element: (
            <AutoScrollArea><CourseRunTimetablePage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId/runs/:courseRunId/playlists",
        element: (
            <AutoScrollArea><CourseRunPlaylistsPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId/runs/:courseRunId/timetable/rules",
        element: (
            <AutoScrollArea><CourseRunTimetablePage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId/runs/:courseRunId/timetable/google-calendar",
        element: (
            <AutoScrollArea><CourseRunGoogleCalendarPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses/:courseId/runs/:courseRunId/members",
        element: (
            <AutoScrollArea><CourseRunMembersPage/></AutoScrollArea>
        ),
    },
    {
        path: "/admin/courses",
        element: (
            <AutoScrollArea><AdminCoursesPage/></AutoScrollArea>
        ),
    },
    {
        path: "/403",
        element: (
            <Page403/>
        )
    },
    {
        path: "*",
        element: (
            <Page404/>
        )
    }
]);

export default router;