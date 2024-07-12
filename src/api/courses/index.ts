import qs from 'qs';
import axiosInstance from "../axios.ts";
import {ICourseFilters} from "../../types/filters.ts";
import {ICourseCard} from "../../types/courses.ts";


const URL = {
    GET_COURSES: "/courses",
};

const getCourses = (filters: ICourseFilters) => {
    return  axiosInstance.get<ICourseCard>(URL.GET_COURSES, {
        params: filters,
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    }).then(res => res.data);
};
export {getCourses};