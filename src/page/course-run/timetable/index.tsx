import AdminCourseRunLayout from "../../../layouts/course-run-layout";
import {Button, Divider, Group, Title} from "@mantine/core";
import React from "react";

const CourseRunTimetablePage = () => {
    return (
        <AdminCourseRunLayout>
            <Group>
                <Title order={2} ta="left">
                    Правила формирования расписания
                </Title>
                <Button variant="light" color="gray" radius="xl">
                    Новое
                </Button>
            </Group>
            <Divider/>
        </AdminCourseRunLayout>
    )
}

export default CourseRunTimetablePage;