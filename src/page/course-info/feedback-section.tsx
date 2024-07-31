import {Divider, Grid, Stack, Text} from "@mantine/core";
import React from "react";
import FeedbackList from "../../components/feedback-list";
import FeedbackCreateForm from "../../components/feedback-create-form";

interface FeedbackSectionProps {
    courseId: string
}

const FeedbackSection: React.FC<FeedbackSectionProps> = (props) => {
    const {courseId} = props;
    return (
        <Stack px={16} pt={16}>
            <Grid>
                <Grid.Col span={{xs: 12, md: 7, lg: 7}}>
                    <FeedbackCreateForm courseId={courseId}/>
                </Grid.Col>
                <Grid.Col span={{xs: 12, md: 5, lg: 5}}>
                    <Text c="dimmed" ta={"left"} fz={18}>
                        Если ты уже прошел курс, то можешь оставить свой отзыв.
                        Расскажи о том, что понравилось и не понравилось.
                        Оправдались ли твои ожидания, какова была сложность и загруженность на курсе.
                    </Text>
                </Grid.Col>
            </Grid>

            <Divider/>
            <FeedbackList courseId={courseId}/>
        </Stack>
    )
}
export default FeedbackSection;