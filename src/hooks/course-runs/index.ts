import {useMutation, useQueryClient} from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation} from "../../types/base.ts";
import {createCourseRun, deleteCourseRun, getCourseRun, getCourseRuns} from "../../api/course-runs";
import {ICreateCourseRun, ICreatedCourseRun} from "../../types/course-runs.ts";
import {useNavigate} from "react-router-dom";


const useCourseRuns = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "course_runs"],
            queryFn: () => getCourseRuns(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCreateCourseRun = (courseId: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "create_course_run"],
            mutationFn: (data: ICreateCourseRun) => createCourseRun(courseId, data),
            onError: (error: AxiosError) => {
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    autoClose: 3000,
                })
            },
            onSuccess: (data: ICreatedCourseRun) => {
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_runs"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Запуск успешно создан",
                    autoClose: 1500,
                })
                navigate(`/admin/courses/${courseId}/runs/${data.course_run_id}`)
            },
        }
    )
};


const useDeleteCourseRun = (courseId: string, courseRunId: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "delete_course_run"],
            mutationFn: () => deleteCourseRun(courseId, courseRunId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_runs"] });
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "course_runs", courseRunId] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Запуск успешно удален",
                    autoClose: 1500,
                })
                navigate(`/admin/courses/${courseId}`)
            },
        }
    )
};

const useCourseRun = (courseId: string, courseRunId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "course_runs", courseRunId],
            queryFn: () => getCourseRun(courseId, courseRunId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

export {useCourseRun, useCreateCourseRun, useDeleteCourseRun, useCourseRuns};