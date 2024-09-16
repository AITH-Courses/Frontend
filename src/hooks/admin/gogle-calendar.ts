import {useMutation, useQueryClient} from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation, ISuccessOperation} from "../../types/base.ts";
import {
    createGoogleCalendarLink,
    deleteGoogleCalendarLink,
    getCourseRunGoogleCalendarLinks
} from "../../api/admin/google-calendar.ts";
import {ICreateGoogleCalendarLink} from "../../types/google-calendar.ts";


const useGoogleCalendarLinks = (courseId: string, courseRunId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "course_run", courseRunId, "google_calendar"],
            queryFn: () => getCourseRunGoogleCalendarLinks(courseId, courseRunId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCreateGoogleCalendar = (courseId: string, courseRunId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "create_google_calendar"],
            mutationFn: (data: ICreateGoogleCalendarLink) => createGoogleCalendarLink(courseId, courseRunId, data),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "google_calendar"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Ссылка на Google-календарь успешно создана",
                    autoClose: 1500,
                })
            },
        }
    )
};

const useDeleteGoogleCalendar = (courseId: string, courseRunId: string, googleGroupCalendarId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "delete_google_calendar"],
            mutationFn: () => deleteGoogleCalendarLink(courseId, courseRunId, googleGroupCalendarId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "google_calendar"] });
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

export {useGoogleCalendarLinks, useCreateGoogleCalendar, useDeleteGoogleCalendar};