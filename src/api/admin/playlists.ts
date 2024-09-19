import axiosInstance from "../axios.ts";
import {ISuccessOperation} from "../../types/base.ts";
import {ICreateUpdatePlaylist, IPlaylist} from "../../types/playlists.ts";

const URL = {
    GET_PLAYLISTS: "/api/v1/admin/courses/courseId/runs/courseRunId/playlists",
    CREATE_PLAYLIST: "/api/v1/admin/courses/courseId/runs/courseRunId/playlists",
    UPDATE_PLAYLIST: "/api/v1/admin/courses/courseId/runs/courseRunId/playlists/playlistId",
    DELETE_PLAYLIST: "/api/v1/admin/courses/courseId/runs/courseRunId/playlists/playlistId",
};


const getPlaylists = (courseId: string, courseRunId: string) => {
    return axiosInstance.get<Array<IPlaylist>>(
        URL.GET_PLAYLISTS
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
    ).then(res => res.data);
};

const createPlaylist = (courseId: string, courseRunId: string, data: ICreateUpdatePlaylist) => {
    return axiosInstance.post<ISuccessOperation>(
        URL.CREATE_PLAYLIST
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId),
        data
    ).then(res => res.data);
};

const deletePlaylist = (courseId: string, courseRunId: string, playlistId: string) => {
    return axiosInstance.delete<ISuccessOperation>(
        URL.DELETE_PLAYLIST
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
            .replace("playlistId", playlistId)
    ).then(res => res.data);
};

const updatePlaylist = (courseId: string, courseRunId: string, playlistId: string, data: ICreateUpdatePlaylist) => {
    return axiosInstance.put<ISuccessOperation>(
        URL.UPDATE_PLAYLIST
            .replace("courseId", courseId)
            .replace("courseRunId", courseRunId)
            .replace("playlistId", playlistId),
        data
    ).then(res => res.data);
};

export {getPlaylists, createPlaylist, deletePlaylist, updatePlaylist};