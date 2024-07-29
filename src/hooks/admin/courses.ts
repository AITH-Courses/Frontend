import {ICourseInfo, ICreatedCourse} from "../../types/courses.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
    deleteCourseById,
    hideCourseById,
    publishCourseById,
    updateCourseById,
    getCourseById,
    getCourses,
    createCourse
} from "../../api/admin/courses.ts";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation, ISuccessOperation} from "../../types/base.ts";
import {createCourseLogo} from "../../api/admin/course-logo.ts";


const useCourses = () => {
    return useQuery(
        {
            queryKey: ["admin_courses"],
            queryFn: () => getCourses(),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCourseById = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["admin_courses", courseId],
            queryFn: () => getCourseById(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useUpdateCourse = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["update_course", courseId],
            mutationFn: (data: ICourseInfo) => updateCourseById(courseId, data),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses"] });
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

const useDeleteCourse = (courseId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(
        {
            mutationKey: ["delete_course", courseId],
            mutationFn: () => deleteCourseById(courseId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: data.message,
                    position: "top-right",
                    autoClose: 1500,
                })
                navigate("/admin/courses")

            },
        }
    )
};

const usePublishCourse = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["publish_course", courseId],
            mutationFn: () => publishCourseById(courseId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses"] });
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

const useHideCourse = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["publish_course", courseId],
            mutationFn: () => hideCourseById(courseId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses", courseId] });
                queryClient.invalidateQueries({ queryKey: ["admin_courses"] });
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

const useCreateCourse = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(
        {
            mutationKey: ["create_course"],
            mutationFn: (courseName: string) => createCourse(courseName),
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
            onSuccess: (data: ICreatedCourse) => {
                queryClient.invalidateQueries({ queryKey: ["admin_courses"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Курс создан",
                    position: "top-right",
                    autoClose: 1500,
                })
                navigate("/admin/courses/" + data.course_id)

            },
        }
    )
};

const useCreateCourseLogo = () => {
    return useMutation(
        {
            mutationKey: ["create_course_logo"],
            mutationFn: (file: File) => createCourseLogo(file),
            onError: (error: AxiosError) => {
                if (error.response === undefined){
                    notifications.show({
                        color: "red" as MantineColor,
                        title: "Ошибка!",
                        message: "Что-то",
                        position: "top-right",
                        autoClose: 3000,
                    })
                } else {
                    const data = error.response.data as IFailedOperation;
                    notifications.show({
                        color: "red" as MantineColor,
                        title: "Ошибка!",
                        message: data.message,
                        position: "top-right",
                        autoClose: 3000,
                    })
                }

            },
            onSuccess: () => {
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Логотип загружен. Не забудьте сохранить изменения.",
                    position: "top-right",
                    autoClose: 1500,
                })
            },
        }
    )
};

export {useCourseById, useUpdateCourse, useDeleteCourse, usePublishCourse, useHideCourse, useCourses, useCreateCourse, useCreateCourseLogo};