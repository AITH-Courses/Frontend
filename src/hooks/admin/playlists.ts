import {useMutation, useQueryClient} from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation} from "../../types/base.ts";
import {createPlaylist, deletePlaylist, getPlaylists, updatePlaylist} from "../../api/admin/playlists.ts";
import {ICreateUpdatePlaylist} from "../../types/playlists.ts";


const usePlaylists = (courseId: string, courseRunId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "course_run", courseRunId, "playlists"],
            queryFn: () => getPlaylists(courseId, courseRunId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCreatePlaylist = (courseId: string, courseRunId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "create_playlist"],
            mutationFn: (data: ICreateUpdatePlaylist) => createPlaylist(courseId, courseRunId, data),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    autoClose: 3000,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "playlists"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Плейлист успешно создан",
                    autoClose: 1500,
                })
            },
        }
    )
};

const useUpdatePlaylist = (courseId: string, courseRunId: string, playlistId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "update_playlist"],
            mutationFn: (data: ICreateUpdatePlaylist) => updatePlaylist(courseId, courseRunId, playlistId, data),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    autoClose: 3000,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "playlists"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Плейлист успешно обновлен",
                    autoClose: 1500,
                })
            },
        }
    )
};
const useDeletePlaylist = (courseId: string, courseRunId: string, playlistId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "delete_playlist"],
            mutationFn: () => deletePlaylist(courseId, courseRunId, playlistId),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    autoClose: 3000,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "playlists"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Плейлист успешно удален",
                    autoClose: 1500,
                })
            },
        }
    )
};

export {usePlaylists, useCreatePlaylist, useUpdatePlaylist, useDeletePlaylist};