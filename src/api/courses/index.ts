import qs from 'qs';
import axiosInstance from "../axios.ts";
import {ICourseFilters} from "../../types/filters.ts";
import {ICourseInfo, ICoursesWithPage} from "../../types/courses.ts";


const URL = {
    GET_COURSES: "/api/v1/courses",
    GET_COURSE: "/api/v1/courses/",
};

const getCourses = (filters: ICourseFilters & {page: number, query: string}) => {
    return  axiosInstance.get<ICoursesWithPage>(URL.GET_COURSES, {
        params: filters,
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    }).then(res => res.data);
};

const getCourseById = (courseId: string) => {
    return  axiosInstance.get<ICourseInfo>(
        URL.GET_COURSE + courseId,
    ).then(res => res.data);
};


export {getCourses, getCourseById};