import {useQuery} from "@tanstack/react-query";
import {getCourseTimetable} from "../../api/timetable";


const useCourseTimetable = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "timetable"],
            queryFn: () => getCourseTimetable(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};


export {useCourseTimetable};