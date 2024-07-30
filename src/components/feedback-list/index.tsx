import React from "react";
import {useFeedbacks} from "../../hooks/feedback";
import {IFeedback} from "../../types/feedbacks.ts";
import FeedbackCard from "../feedback-card";
import EmptyFeedbackCard from "../empty-feedback-card";
import {Text} from "@mantine/core";

interface FeedbackListProps {
    courseId: string
}

const FeedbackList: React.FC<FeedbackListProps> = (props) => {
    const {courseId} = props;
    const {data: feedbacks, isFetching: isFeedbacksFetching, isSuccess: isFeedbacksSuccess, isError: isFeedbacksError} = useFeedbacks(courseId)

    if (isFeedbacksFetching){
        return [1, 2, 3].map(number => <EmptyFeedbackCard key={number}/>)
    }

    if (isFeedbacksError){
        return (
            <Text c="black" ta={"left"}>
                Возникла ошибка при загрузке отзывов
            </Text>
        )
    }

    if (isFeedbacksSuccess){
        if ((feedbacks as Array<IFeedback>).length === 0){
            return (
                <Text c="black" ta={"center"}>
                    Пока отзывов нет
                </Text>
            )
        }
        return (feedbacks as Array<IFeedback>).map(
            feedback => <FeedbackCard key={feedback.id} feedback={feedback} courseId={courseId}/>
        )
    }
}
export default FeedbackList;