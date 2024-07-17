import {Skeleton, Stack} from "@mantine/core";
import React from "react";


const EmptyCourseCard = () => {
    return (
        <Stack gap={"xs"}>
            <Skeleton height={177} width={"100%"} radius="lg" />
            <Skeleton height={34} width={"100%"} radius="md" />
            <Skeleton height={20} width={"50%"} radius="md" />
            <Skeleton height={20} width={"50%"} radius="md" />
        </Stack>
    )
}
export default EmptyCourseCard;