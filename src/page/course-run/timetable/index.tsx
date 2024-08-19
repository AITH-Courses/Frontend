import AdminCourseRunLayout from "../../../layouts/course-run-layout";
import {Button, Divider, Flex, Group, Modal, Skeleton, Stack, Table, Text, Title} from "@mantine/core";
import React from "react";
import {useAdminTimetable} from "../../../hooks/admin/timetable.ts";
import {useNavigate, useParams} from "react-router-dom";
import {IAdminCourseRunTimetable} from "../../../types/timetable.ts";
import {
    formatTime,
    getRussianDayOfWeekByDateString,
    getRussianMonthAndNumberByDateString
} from "../../../utils/date.ts";
import TimetableRuleCard from "../../../components/timetable-rule-card";
import {AxiosError} from "axios";
import {useDisclosure} from "@mantine/hooks";
import {CreateRuleModal} from "./create-rule-modal.tsx";


interface pageParams{
    courseId: string,
    courseRunId: string
}

const CourseRunTimetablePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const {data, isSuccess, isLoading, isError, error} = useAdminTimetable((params as pageParams).courseId, (params as pageParams).courseRunId);


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

    const rules = isSuccess && data && (data as IAdminCourseRunTimetable).rules.map(rule => (
        <TimetableRuleCard
            key={rule.id}
            rule={rule}
            courseId={(params as pageParams).courseId}
            courseRunId={(params as pageParams).courseRunId}
        />
    ))

    const rows = isSuccess && data && (data as IAdminCourseRunTimetable).lessons.map((lesson, index) => (
        <Table.Tr
            key={lesson.date + lesson.start_time}
            bg={lesson.warning_messages.length > 0? 'var(--mantine-color-red-light)' : undefined}
        >
            <Table.Td>
                {index + 1}
            </Table.Td>
            <Table.Td>
                {getRussianMonthAndNumberByDateString(lesson.date)}
            </Table.Td>
            <Table.Td>
                {getRussianDayOfWeekByDateString(lesson.date)}
            </Table.Td>
            <Table.Td>
                {formatTime(lesson.start_time)} - {formatTime(lesson.end_time)}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <AdminCourseRunLayout>
            <Modal opened={opened} onClose={close} title="Создание нового правила" centered>
                <CreateRuleModal
                    courseId={(params as pageParams).courseId}
                    courseRunId={(params as pageParams).courseRunId}
                    timetableId={isSuccess && data? (data as IAdminCourseRunTimetable).id: ""}
                    closeModal={close}
                />
            </Modal>
            <Group>
                {
                    isLoading
                    ? <Skeleton height={36} width={"100%"} radius="lg" />
                    : (
                        <>
                            <Title order={2} ta="left">
                                Правила формирования расписания
                            </Title>
                            <Button variant="outline" color="black" radius="xl" onClick={open}>
                                Новое
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
                    : (data as IAdminCourseRunTimetable).rules.length > 0
                        ? rules
                        : <Text>Правила отсутствуют</Text>
                }
            </Flex>
            <Divider/>
            {
                isLoading
                ? (
                    <Skeleton height={200} width={"100%"} radius="lg" />
                ): (data as IAdminCourseRunTimetable).lessons.length > 0
                    ? (
                        <Table highlightOnHover maw={500}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th><Text fw={700}>Номер</Text></Table.Th>
                                    <Table.Th><Text fw={700}>Дата</Text></Table.Th>
                                    <Table.Th><Text fw={700}>День недели</Text></Table.Th>
                                    <Table.Th><Text fw={700}>Время</Text></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    ): <Text>Расписание отсутствует</Text>
            }
        </AdminCourseRunLayout>
    )
}

export default CourseRunTimetablePage;