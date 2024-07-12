import {useQuery} from "@tanstack/react-query";
import {getCourseById, getCourses} from "../../api/courses";
import {ICourseFilters} from "../../types/filters.ts";

const useCourses = (filters: ICourseFilters & {page: number}) => {
    return useQuery(
        {
            queryKey: ["courses", JSON.stringify(filters)],
            queryFn: () => getCourses(filters),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCourseById = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId],
            queryFn: () => getCourseById(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};


export {useCourses, useCourseById};