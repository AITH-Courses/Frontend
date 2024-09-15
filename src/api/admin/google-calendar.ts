import axiosInstance from "../axios.ts";
import {ISuccessOperation} from "../../types/base.ts";
import {ICreateGoogleCalendarLink, IGoogleCalendarLink} from "../../types/google-calendar.ts";

const URL = {
    CREATE_GOOGLE_CALENDAR_LINK: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable/google_calendar_groups",
    GET_GOOGLE_CALENDAR_LINKS: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable/google_calendar_groups",
    DELETE_GOOGLE_CALENDAR_LINK: "/api/v1/admin/courses/courseId/runs/courseRunId/timetable/google_calendar_groups/googleGroupCalendarId",
};


const getCourseRunGoogleCalendarLinks = (courseId: string, courseRunId: string) => {
    return axiosInstance.get<Array<IGoogleCalendarLink>>(
        URL.GET_GOOGLE_CALENDAR_LINKS
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
    ).then(res => res.data);
};

const createGoogleCalendarLink = (courseId: string, courseRunId: string, data: ICreateGoogleCalendarLink) => {
    return axiosInstance.post<ISuccessOperation>(
        URL.CREATE_GOOGLE_CALENDAR_LINK
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId),
        data
    ).then(res => res.data);
};

const deleteGoogleCalendarLink = (courseId: string, courseRunId: string, googleGroupCalendarId: string) => {
    return axiosInstance.delete<ISuccessOperation>(
        URL.DELETE_GOOGLE_CALENDAR_LINK
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
            .replace("googleGroupCalendarId", googleGroupCalendarId)
    ).then(res => res.data);
};

export {getCourseRunGoogleCalendarLinks, createGoogleCalendarLink, deleteGoogleCalendarLink};