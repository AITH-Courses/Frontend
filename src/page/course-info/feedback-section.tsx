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
            <Text fw={600} fz={"h3"}>
                Прошел курс? Поделись впечатлениями!
            </Text>
            <Grid>
                <Grid.Col span={{xs: 12, md: 7, lg: 7}}>
                    <FeedbackCreateForm courseId={courseId}/>
                </Grid.Col>
            </Grid>

            <Divider/>
            <FeedbackList courseId={courseId}/>
        </Stack>
    )
}
export default FeedbackSection;