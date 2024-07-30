import {Group, Space,} from "@mantine/core";
import React from "react";
import {Skeleton} from "@mantine/core";

const EmptyFeedbackCard = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Skeleton h={20} w={18*5}/>
            <Space h={4}/>
            <Skeleton h={24} w={"100%"}/>
            <Space h={4}/>
            <Group>
                <Skeleton h={20} w={110}/>
                <Skeleton h={20} w={82}/>
            </Group>
            <Space h={4}/>
            <Skeleton h={30} w={150}/>
        </div>
    )
}
export default EmptyFeedbackCard;