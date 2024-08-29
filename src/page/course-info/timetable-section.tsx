import {Button, Group, Skeleton, Stack, Table, Text} from "@mantine/core";
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

    const rows = isSuccess && data && (data as ICourseTimetable).lessons.map((lesson, index) => (
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

    return (
        <Stack px={16} pt={16}>
            <Text fw={600} fz={"h3"}>
                Запуск курса ({isSuccess && data && (data as ICourseTimetable).course_run_name})
            </Text>
            <Group>
                <Button variant="outline" color="black" onClick={downloadICS}>
                    Скачать ICS
                </Button>
            </Group>
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
        </Stack>
    )
}
export default TimetableSection;