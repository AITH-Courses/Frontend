import axiosInstance from "../axios.ts";
import {ICourseCard, ICourseInfo, ICreatedCourse, IUpdateCourseInfo} from "../../types/courses.ts";
import {ISuccessOperation} from "../../types/base.ts";

const URL = {
    CREATE_COURSE: "/api/v1/admin/courses",
    GET_COURSES: "/api/v1/admin/courses",
    GET_COURSE: "/api/v1/admin/courses/",
    UPDATE_COURSE: "/api/v1/admin/courses/",
    DELETE_COURSE: "/api/v1/admin/courses/",
    PUBLISH_COURSE: "/api/v1/admin/courses/course_id/published",
    HIDE_COURSE: "/api/v1/admin/courses/course_id/published",
};


const getCourses = () => {
    return axiosInstance.get<ICourseCard>(URL.GET_COURSES).then(res => res.data);
};

const getCourseById = (courseId: string) => {
    return axiosInstance.get<ICourseInfo>(URL.GET_COURSE + courseId).then(res => res.data);
};

const updateCourseById = (courseId: string, data: IUpdateCourseInfo) => {
    return axiosInstance.put<ISuccessOperation>(URL.UPDATE_COURSE + courseId, data).then(res => res.data);
};

const deleteCourseById = (courseId: string) => {
    return axiosInstance.delete<ISuccessOperation>(URL.DELETE_COURSE + courseId).then(res => res.data);
};

const publishCourseById = (courseId: string) => {
    return axiosInstance.post<ISuccessOperation>(URL.PUBLISH_COURSE.replace("course_id", courseId)).then(res => res.data);
};

const hideCourseById = (courseId: string) => {
    return axiosInstance.delete<ISuccessOperation>(URL.HIDE_COURSE.replace("course_id", courseId)).then(res => res.data);
};

const createCourse = (courseName: string) => {
    return axiosInstance.post<ICreatedCourse>(URL.CREATE_COURSE, {name: courseName}).then(res => res.data);
};

export {getCourses, getCourseById, updateCourseById, deleteCourseById, publishCourseById, hideCourseById, createCourse};