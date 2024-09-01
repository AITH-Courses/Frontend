import {IFeedback} from "../../types/feedbacks.ts";
import {ActionIcon, Group, Rating, Space, Text} from "@mantine/core";
import React, {useState} from "react";
import {IconThumbUp, IconThumbUpFilled, IconThumbDown, IconThumbDownFilled, IconTrash} from "@tabler/icons-react";
import {useDeleteFeedback, useUnvoteFeedback, useVoteFeedback} from "../../hooks/feedback";
import {formatDate} from "../../utils/date.ts";

interface FeedbackCardProps{
    courseId: string
    feedback: IFeedback
}

const FeedbackCard: React.FC<FeedbackCardProps> = (props) => {
    const [feedback, setFeedback] = useState(props.feedback)
    const {mutateAsync: voteMutate} = useVoteFeedback(props.courseId, feedback.id)
    const {mutateAsync: unvoteMutate} = useUnvoteFeedback(props.courseId, feedback.id)
    const {mutateAsync: deleteMutate} = useDeleteFeedback(props.courseId, feedback.id)
    const like = () => {
        if (feedback.liked_by_user){
            unvoteMutate(undefined).then(
                () => setFeedback({...feedback, liked_by_user: false, reputation: feedback.reputation - 1, is_author: true}),
                null
            )
        } else if (feedback.disliked_by_user){
            voteMutate("like").then(
                () => setFeedback({...feedback, liked_by_user: true, disliked_by_user: false, reputation: feedback.reputation + 2}),
                null
            )
        } else {
            voteMutate("like").then(
                () => setFeedback({...feedback, liked_by_user: true, reputation: feedback.reputation + 1}),
                null
            )
        }
    }

    const dislike = () => {
        if (feedback.disliked_by_user){
            unvoteMutate(undefined).then(
                () => setFeedback({...feedback, disliked_by_user: false, reputation: feedback.reputation + 1}),
                null
            )
        } else if (feedback.liked_by_user){
            voteMutate("dislike").then(
                () => setFeedback({...feedback, disliked_by_user: true, liked_by_user: false,  reputation: feedback.reputation - 2}),
                null
            )
        } else {
            voteMutate("dislike").then(
                () => setFeedback({...feedback, disliked_by_user: true, liked_by_user: false, reputation: feedback.reputation - 1}),
                null
            )
        }
    }

    const deleteFeedback = () => {
        deleteMutate(undefined)
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Rating defaultValue={feedback.rating} count={5} readOnly/>
            <Space h={4}/>
            <Text c="black" ta={"left"} style={{whiteSpace: "pre-wrap"}}>
                {feedback.text}
            </Text>
            <Group>
                <Text c="dimmed" ta={"left"}>
                    {
                        feedback.is_author
                        ? "Ваш отзыв"
                        : "Отзыв таланта"
                    }
                </Text>
                <Text c="dimmed" ta={"left"}>
                    {formatDate(feedback.date)}
                </Text>
                {
                    feedback.is_author
                    ? (
                        <ActionIcon title={"Удалить отзыв"} onClick={deleteFeedback} variant="transparent" color="red" size="lg" aria-label="Dislike">
                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1} />
                        </ActionIcon>
                    ) : null
                }
            </Group>

            <Group>
                <ActionIcon onClick={like} variant="transparent" color="rgba(0, 0, 0, 1)" size="lg" aria-label="Like">
                    {
                        feedback.liked_by_user
                        ? <IconThumbUpFilled title={"Отменить лайк"} style={{ width: '70%', height: '70%' }} stroke={1} />
                        : <IconThumbUp title={"Поставить лайк"} style={{ width: '70%', height: '70%' }} stroke={1} />
                    }
                </ActionIcon>
                <Text c="black" ta={"left"}>
                    {feedback.reputation}
                </Text>
                <ActionIcon onClick={dislike} variant="transparent" color="rgba(0, 0, 0, 1)" size="lg" aria-label="Dislike">
                    {
                        feedback.disliked_by_user
                        ? <IconThumbDownFilled title={"Отменить дизлайк"} style={{ width: '70%', height: '70%' }} stroke={1} />
                        : <IconThumbDown title={"Поставить дизлайк"} style={{ width: '70%', height: '70%' }} stroke={1} />
                    }
                </ActionIcon>
            </Group>
        </div>

    )
}
export default FeedbackCard;