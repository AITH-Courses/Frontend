import {useMutation, useQueryClient} from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';
import {MantineColor} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IFailedOperation, ISuccessOperation} from "../../types/base.ts";
import {createFeedback, deleteFeedback, getFeedbacks, unvoteFeedback, voteFeedback} from "../../api/feedback";


const useFeedbacks = (courseId: string) => {
    return useQuery(
        {
            queryKey: ["courses", courseId, "feedbacks"],
            queryFn: () => getFeedbacks(courseId),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useCreateFeedback = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "create_feedback"],
            mutationFn: (text: string) => createFeedback(courseId, text),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "feedbacks"] });
                notifications.show({
                    color: "green" as MantineColor,
                    title: "Успешно!",
                    message: "Отзыв успешно создан",
                    autoClose: 1500,
                })
            },
        }
    )
};

const useDeleteFeedback = (courseId: string, feedbackId: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["courses", courseId, "delete_feedback"],
            mutationFn: () => deleteFeedback(courseId, feedbackId),
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
                queryClient.invalidateQueries({ queryKey: ["courses", courseId, "feedbacks"] });
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

const useVoteFeedback = (courseId: string, feedbackId: string) => {
    return useMutation(
        {
            mutationKey: ["courses", courseId, "vote_feedback"],
            mutationFn: (voteType: string) => voteFeedback(courseId, feedbackId, voteType),
            onError: (error: AxiosError) => {
                console.log(error)
                const data = error.response.data as IFailedOperation;
                notifications.show({
                    color: "red" as MantineColor,
                    title: "Ошибка!",
                    message: data.message,
                    position: "top-right",
                    autoClose: 3000,
                })
            },
        }
    )
};

const useUnvoteFeedback = (courseId: string, feedbackId: string) => {
    return useMutation(
        {
            mutationKey: ["courses", courseId, "unvote_feedback"],
            mutationFn: () => unvoteFeedback(courseId, feedbackId),
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
        }
    )
};

export {useFeedbacks, useCreateFeedback, useDeleteFeedback, useVoteFeedback, useUnvoteFeedback};