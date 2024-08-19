import {useMutation, useQueryClient} from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation, ISuccessOperation} from "../../types/base.ts";
import {
    createTimetableRule,
    deleteTimetableRule,
    getCourseRunTimetable,
    updateTimetableRule
} from "../../api/admin/timetable.ts";
import {ICreateOrUpdateRule} from "../../types/timetable.ts";


const useAdminTimetable = (courseId: string, courseRunId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "course_run", courseRunId, "timetable"],
            queryFn: () => getCourseRunTimetable(courseId, courseRunId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCreateTimetableRule = (courseId: string, courseRunId: string, timetableId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "create_rule"],
            mutationFn: (data: ICreateOrUpdateRule) => createTimetableRule(courseId, courseRunId, timetableId, data),
            onError: () => {
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: "Требуется заполнить все поля в форме",
                    autoClose: 3000,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "timetable"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Правило успешно создано",
                    autoClose: 1500,
                })
            },
        }
    )
};

const useUpdateTimetableRule = (courseId: string, courseRunId: string, timetableId: string, ruleId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "delete_feedback"],
            mutationFn: (data: ICreateOrUpdateRule) => updateTimetableRule(courseId, courseRunId, timetableId, ruleId, data),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "timetable"] });
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
const useDeleteTimetableRule = (courseId: string, courseRunId: string, timetableId: string, ruleId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "course_run", courseRunId, "delete_feedback"],
            mutationFn: () => deleteTimetableRule(courseId, courseRunId, timetableId, ruleId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_run", courseRunId, "timetable"] });
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

export {useAdminTimetable, useCreateTimetableRule, useDeleteTimetableRule, useUpdateTimetableRule};