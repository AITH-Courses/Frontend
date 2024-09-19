import {useQuery} from "@tanstack/react-query";
import {getCoursePlaylists} from "../../api/playlists";

const useCoursePlaylists = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "playlists"],
            queryFn: () => getCoursePlaylists(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

export {useCoursePlaylists};