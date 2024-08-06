import axiosInstance from "../axios.ts";
import {ICreatedFeedback, ICreateFeedback, IFeedback} from "../../types/feedbacks.ts";
import {ISuccessOperation} from "../../types/base.ts";

const URL = {
    GET_FEEDBACKS: "/api/v1/courses/courseId/feedbacks",
    CREATE_FEEDBACK: "/api/v1/courses/courseId/feedbacks",
    DELETE_FEEDBACK: "/api/v1/courses/courseId/feedbacks/feedbackId",
    VOTE_FEEDBACK: "/api/v1/courses/courseId/feedbacks/feedbackId/vote",
    UNVOTE_FEEDBACK: "/api/v1/courses/courseId/feedbacks/feedbackId/vote",
};

const getFeedbacks = (courseId: string) => {
    return  axiosInstance.get<Array<IFeedback>>(URL.GET_FEEDBACKS.replace("courseId", courseId), {
    }).then(res => res.data);
};

const createFeedback = (courseId: string, data: ICreateFeedback) => {
    return  axiosInstance.post<ICreatedFeedback>(
        URL.CREATE_FEEDBACK.replace("courseId", courseId),
        data
        ).then(res => res.data);
};


const deleteFeedback = (courseId: string, feedbackId: string) => {
    return  axiosInstance.delete<ISuccessOperation>(
        URL.DELETE_FEEDBACK.replace("courseId", courseId).replace("feedbackId", feedbackId),
    ).then(res => res.data);
};


const voteFeedback = (courseId: string, feedbackId: string, voteType: string) => {
    return  axiosInstance.post<ISuccessOperation>(
        URL.VOTE_FEEDBACK.replace("courseId", courseId).replace("feedbackId", feedbackId),
        {
            vote_type: voteType
        }
    ).then(res => res.data);
};

const unvoteFeedback = (courseId: string, feedbackId: string) => {
    return  axiosInstance.delete<ISuccessOperation>(
        URL.UNVOTE_FEEDBACK.replace("courseId", courseId).replace("feedbackId", feedbackId)
    ).then(res => res.data);
};

export {getFeedbacks, createFeedback, deleteFeedback, voteFeedback, unvoteFeedback}