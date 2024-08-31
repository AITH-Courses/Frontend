import {useMutation, useQueryClient} from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation, ISuccessOperation} from "../../types/base.ts";
import {createProfile, getProfile, updateProfileGeneral, updateProfileLinks} from "../../api/talent-profile";
import {IUpdateProfileGeneral, IUpdateProfileLinks} from "../../types/talent-profile.ts";
import {createCourseLogo} from "../../api/admin/course-logo.ts";
import {createTalentAvatar} from "../../api/talent-profile/talent-avatar.ts";


const useProfile = () => {
    return useQuery(
        {
            queryKey: ["profile"],
            queryFn: () => getProfile(),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCreateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["create_profile"],
            mutationFn: () => createProfile(),
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
                queryClient.invalidateQueries({ queryKey: ["profile"] });
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

const useUpdateProfileGeneral = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["update_profile_general"],
            mutationFn: (data: IUpdateProfileGeneral) => updateProfileGeneral(data),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    position: "top-right",
                    autoClose: 3000,
                })
            },
            onSuccess: (data: ISuccessOperation) => {
                queryClient.invalidateQueries({ queryKey: ["profile"] });
                queryClient.invalidateQueries({ queryKey: ["me"] });
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

const useUpdateProfileLinks = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["update_profile_links"],
            mutationFn: (data: IUpdateProfileLinks) => updateProfileLinks(data),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    position: "top-right",
                    autoClose: 3000,
                })
            },
            onSuccess: (data: ISuccessOperation) => {
                queryClient.invalidateQueries({ queryKey: ["profile"] });
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

const useCreateTalentAvatar = () => {
    return useMutation(
        {
            mutationKey: ["create_talent_avatar"],
            mutationFn: (file: File) => createTalentAvatar(file),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message || "Внутренняя ошибка сервера",
                    position: "top-right",
                    autoClose: 3000,
                })

            },
            onSuccess: () => {
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Аватар загружен. Не забудьте сохранить изменения.",
                    position: "top-right",
                    autoClose: 1500,
                })
            },
        }
    )
};

export {useUpdateProfileGeneral, useCreateProfile, useProfile, useUpdateProfileLinks, useCreateTalentAvatar}