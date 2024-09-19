import axiosInstance from "../axios.ts";
import {IPlaylist} from "../../types/playlists.ts";

const URL = {
    GET_PLAYLISTS: "/api/v1/admin/courses/courseId/runs/courseRunId/playlists",
};

const getCoursePlaylists = (courseId: string) => {
    return  axiosInstance.get<Array<IPlaylist>>(URL.GET_PLAYLISTS.replace("courseId", courseId), {
    }).then(res => res.data);
};


export {getCoursePlaylists}