import {Anchor, Button, Group, Skeleton, Stack, Table, Text} from "@mantine/core";
import React from "react";
import {useCourseTimetable} from "../../hooks/timetable";
import {ICourseTimetable} from "../../types/timetable.ts";
import {formatTime, getRussianDayOfWeekByDateString, getRussianMonthAndNumberByDateString} from "../../utils/date.ts";
import {AxiosError} from "axios";
import {generateICS} from "../../utils/ics.ts";

interface TimetableSectionProps {
    courseId: string,
    courseName?: string
}

const TimetableSection: React.FC<TimetableSectionProps> = (props) => {
    const {courseId, courseName} = props;
    const {data, isSuccess, isError, error, isFetching} = useCourseTimetable(courseId);

    if (isFetching) {
        return <Stack px={16} pt={16}>
            <Skeleton h={36}/>
            <Skeleton h={200}/>
        </Stack>
    }

    if (isError) {
        return <Stack px={16} pt={16}>
            <Text c="dimmed" size="lg" ta="left" >
                {(error as AxiosError).response.data.message}
            </Text>
        </Stack>
    }

    const downloadICS = () => {
        const blob = new Blob(
            [generateICS((data as ICourseTimetable).lessons, courseName.toString())],
            { type: 'text/calendar' }
        );
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Расписание курса "${courseName}".ics`;
        link.click();
        link.remove();
    }

    const rows = isSuccess && data && (data as ICourseTimetable).lessons.map((lesson) => (
        <Table.Tr
            key={lesson.date + lesson.start_time}
        >
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

    const group_google_calendars = isSuccess && data && (data as ICourseTimetable).group_google_calendars;
    const lessons = isSuccess && data && (data as ICourseTimetable).lessons;

    return (
        <Stack px={16} pt={16}>
            <Text fw={600} fz={"h3"}>
                Запуск курса ({isSuccess && data && (data as ICourseTimetable).course_run_name})
            </Text>
            {
                group_google_calendars && group_google_calendars.length > 1
                    ? (
                        <Stack gap={8}>
                            <Text size="lg" ta="left" >
                                Расписание отличается для разных потоков:
                            </Text>
                            {
                                group_google_calendars.map(ggc => (
                                    <Group key={ggc.id} gap={4}>
                                        <Text size="lg" ta="left">
                                            - {ggc.name === "" ? "Без названия": ggc.name}:
                                        </Text>
                                        <Anchor component={"a"} fz="sm" href={ggc.link} target="_blank">
                                            <Text size="lg" ta="left" >
                                                Google Календарь
                                            </Text>
                                        </Anchor>
                                    </Group>
                                ))
                            }
                        </Stack>
                    ): null
            }
            <Group>
                {
                    group_google_calendars && group_google_calendars.length === 1 && group_google_calendars.map(ggc => (
                        <Anchor component={"a"} key={ggc.id} fz="sm" href={ggc.link} target="_blank">
                            <Button variant="outline" color="black">
                                Добавить в Google Календарь
                            </Button>
                        </Anchor>
                    ))
                }
                {
                    group_google_calendars && group_google_calendars.length <= 1 && lessons && lessons.length >0 && (
                        <Button variant="outline" color="black" onClick={downloadICS}>
                            Скачать ICS
                        </Button>
                    )
                }
            </Group>
            {
                group_google_calendars && group_google_calendars.length <= 1 && lessons && lessons.length > 0 && (
                    <Table highlightOnHover maw={500}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th><Text fw={700}>Дата</Text></Table.Th>
                                <Table.Th><Text fw={700}>День недели</Text></Table.Th>
                                <Table.Th><Text fw={700}>Время</Text></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                )
            }
        </Stack>
    )
}
export default TimetableSection;