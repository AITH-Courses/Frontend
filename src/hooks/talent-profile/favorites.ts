import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addNewFavorite,
    deleteFavorite,
    getFavoriteCourses,
    getFavoriteStatus,
} from "../../api/talent-profile";
import {AxiosError} from "axios";
import {IFailedOperation, ISuccessOperation} from "../../types/base.ts";
import {notifications} from "@mantine/notifications";
import {MantineColor} from "@mantine/core";
import {ICreateFavorite} from "../../types/talent-profile.ts";

const useFavoriteCourses = () => {
    return useQuery(
        {
            queryKey: ["favorites"],
            queryFn: () => getFavoriteCourses(),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useAddNewFavorite = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["create_favorite"],
            mutationFn: () => addNewFavorite({course_id: courseId}),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    autoClose: 3000,
                })
            },
            onSuccess: (data: ISuccessOperation) => {
                queryClient.invalidateQueries({ queryKey: ["favorites"] });
                queryClient.invalidateQueries({ queryKey: ["course", courseId, "favorite_status"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: data.message,
                    autoClose: 1500,
                })
            },
        }
    )
};

const useDeleteFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["create_favorite"],
            mutationFn: (favoriteCourseId: string) => deleteFavorite(favoriteCourseId),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    autoClose: 3000,
                })
            },
            onSuccess: (data: ISuccessOperation) => {
                queryClient.invalidateQueries({ queryKey: ["favorites"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: data.message,
                    autoClose: 1500,
                })
            },
        }
    )
};

const useFavoriteStatus = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["course", courseId, "favorite_status"],
            queryFn: () => getFavoriteStatus(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

export {useDeleteFavorite, useAddNewFavorite, useFavoriteCourses, useFavoriteStatus}