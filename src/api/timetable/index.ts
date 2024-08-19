import axiosInstance from "../axios.ts";
import {ICourseRun} from "../../types/course-runs.ts";

const URL = {
    GET_TIMETABLE: "/api/v1/courses/courseId/timetable",
};

const getCourseTimetable = (courseId: string) => {
    return  axiosInstance.get<Array<ICourseRun>>(URL.GET_TIMETABLE.replace("courseId", courseId), {
    }).then(res => res.data);
};


export {getCourseTimetable}