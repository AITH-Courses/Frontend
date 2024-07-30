import {Group, Space, Text} from "@mantine/core";
import React from "react";
import {Skeleton} from "@mantine/core";

const EmptyFeedbackCard = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Group>
                <Skeleton h={24} w={110}/>
                <Skeleton h={24} w={82}/>
            </Group>
            <Space h={42}/>
            <Text c="dimmed" ta={"left"}>
                <Skeleton h={24} w={"100%"}/>
            </Text>
            <Space h={4}/>
            <Skeleton h={34} w={110}/>
        </div>
    )
}
export default EmptyFeedbackCard;