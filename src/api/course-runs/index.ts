import axiosInstance from "../axios.ts";
import {ISuccessOperation} from "../../types/base.ts";
import {ICourseRun, ICreateCourseRun, ICreatedCourseRun} from "../../types/course-runs.ts";

const URL = {
    GET_COURSE_RUNS: "/api/v1/admin/courses/courseId/runs",
    CREATE_COURSE_RUN: "/api/v1/admin/courses/courseId/runs",
    DELETE_COURSE_RUN: "/api/v1/admin/courses/courseId/runs/courseRunId",
    GET_COURSE_RUN: "/api/v1/admin/courses/courseId/runs/courseRunId"
};

const getCourseRuns = (courseId: string) => {
    return  axiosInstance.get<Array<ICourseRun>>(URL.GET_COURSE_RUNS.replace("courseId", courseId), {
    }).then(res => res.data);
};

const createCourseRun = (courseId: string, data: ICreateCourseRun) => {
    return  axiosInstance.post<ICreatedCourseRun>(
        URL.CREATE_COURSE_RUN.replace("courseId", courseId),
        data
    ).then(res => res.data);
};


const deleteCourseRun = (courseId: string, courseRunId: string) => {
    return  axiosInstance.delete<ISuccessOperation>(
        URL.DELETE_COURSE_RUN.replace("courseId", courseId).replace("courseRunId", courseRunId),
    ).then(res => res.data);
};

const getCourseRun = (courseId: string, courseRunId: string) => {
    return  axiosInstance.get<ICourseRun>(
        URL.GET_COURSE_RUN.replace("courseId", courseId).replace("courseRunId", courseRunId),
    ).then(res => res.data);
};


export {getCourseRuns, createCourseRun, deleteCourseRun, getCourseRun}