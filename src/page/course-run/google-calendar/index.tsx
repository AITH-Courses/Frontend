import AdminCourseRunLayout from "../../../layouts/course-run-layout";
import {Button, Divider, Flex, Group, Modal, Skeleton, Stack, Text, Title} from "@mantine/core";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosError} from "axios";
import {useDisclosure} from "@mantine/hooks";
import {useGoogleCalendarLinks} from "../../../hooks/admin/gogle-calendar.ts";
import {IGoogleCalendarLink} from "../../../types/google-calendar.ts";
import GoogleCalendarLinkCard from "../../../components/google-calendar-link-card";
import {CreateGoogleLinkModal} from "./create-google-link-modal.tsx";


interface pageParams{
    courseId: string,
    courseRunId: string
}

const CourseRunGoogleCalendarPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const {data, isSuccess, isLoading, isError, error} = useGoogleCalendarLinks((params as pageParams).courseId, (params as pageParams).courseRunId);

    if (isError){
        if ((error as AxiosError).response.status === 401){
            navigate("/login");
        }
        if ((error as AxiosError).response.status === 403){
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

    const links = isSuccess && data && (data as Array<IGoogleCalendarLink>).map(link => (
        <GoogleCalendarLinkCard
            key={link.id}
            id={link.id}
            name={link.name}
            link={link.link}
            courseId={(params as pageParams).courseId}
            courseRunId={(params as pageParams).courseRunId}
        />
    ))

    return (
        <AdminCourseRunLayout>
            <Modal opened={opened} onClose={close} title="Создание нового правила" centered>
                <CreateGoogleLinkModal
                    closeModal={close}
                    courseId={(params as pageParams).courseId}
                    courseRunId={(params as pageParams).courseRunId}
                />
            </Modal>
            <Group>
                {
                    isLoading
                    ? <Skeleton height={36} width={"100%"} radius="lg" />
                    : (
                        <>
                            <Title order={2} ta="left">
                                Ссылки на Google-календарь
                            </Title>
                            <Button variant="outline" color="black" radius="xl" onClick={open}>
                                Новая
                            </Button>
                        </>
                    )
                }
            </Group>
            <Divider/>
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="stretch"
                direction="row"
                wrap="wrap"
            >
                {
                    isLoading
                        ? <Skeleton height={130} width={"100%"} radius="lg" />
                        : (data as Array<IGoogleCalendarLink>).length > 0
                            ? links
                            : <Text>Ссылки отсутствуют</Text>
                }
            </Flex>
        </AdminCourseRunLayout>
    )
}

export default CourseRunGoogleCalendarPage;