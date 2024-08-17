import AdminCourseRunLayout from "../../../layouts/course-run-layout";
import {Button, Divider, Group, Skeleton, Stack, Text, Title} from "@mantine/core";
import React from "react";
import {useCourseRun, useDeleteCourseRun} from "../../../hooks/course-runs";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosError} from "axios";
import {ICourseRun} from "../../../types/course-runs.ts";


interface pageParams{
    courseId: string,
    courseRunId: string
}

const CourseRunGeneralPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {data, isSuccess,  isLoading, isError, error} = useCourseRun((params as pageParams).courseId, (params as pageParams).courseRunId)
    const {mutateAsync, isPending} = useDeleteCourseRun((params as pageParams).courseId, (params as pageParams).courseRunId)

    if (isError){
        if ([403, 401].includes((error as AxiosError).response.status)){
            navigate("/403");
        }
        return (
            <AdminCourseRunLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Произошла ошибка при загрузке страницы запуска, возможно его не существует
                    </Text>
                    <Button variant="filled" size="sm" color="dark" onClick={() => navigate(`/admin/courses/${(params as pageParams).courseId}`)}>
                        Вернуться к курсу
                    </Button>
                </Stack>
            </AdminCourseRunLayout>
        )
    }

    return (
        <AdminCourseRunLayout>
            {
                isLoading
                ? (
                    <Skeleton height={30} width={"100%"} radius="lg" />
                ): (
                    <Title order={2} ta="left">
                        Запуск курса: {isSuccess && (data as ICourseRun).name}
                    </Title>
                )
            }
            <Divider/>
                {
                    isLoading
                        ? (
                            <Skeleton height={30} width={"100%"} radius="lg" />
                        ): (
                            <Group>
                                <Button variant="light" color="red" radius="xl" loading={isPending} onClick={() => mutateAsync(undefined)}>
                                    Удалить
                                </Button>
                            </Group>
                        )
                }
        </AdminCourseRunLayout>
    )
}

export default CourseRunGeneralPage;