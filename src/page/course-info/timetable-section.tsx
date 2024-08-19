import {Skeleton, Stack, Table, Text} from "@mantine/core";
import React from "react";
import {useCourseTimetable} from "../../hooks/timetable";
import {ICourseTimetable} from "../../types/timetable.ts";
import {formatTime, getRussianDayOfWeekByDateString, getRussianMonthAndNumberByDateString} from "../../utils/date.ts";

interface TimetableSectionProps {
    courseId: string
}

const TimetableSection: React.FC<TimetableSectionProps> = (props) => {
    const {courseId} = props;
    const {data, isSuccess, isError, isFetching} = useCourseTimetable(courseId);

    if (isFetching) {
        return <Stack px={16} pt={16}>
            <Skeleton h={36}/>
            <Skeleton h={200}/>
        </Stack>
    }

    if (isError) {
        return <Stack px={16} pt={16}>
            <Text c="dimmed" size="lg" ta="left" >
                Произошла ошибка при загрузке расписания
            </Text>
        </Stack>
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

    return (
        <Stack px={16} pt={16}>
            <Text fw={600} fz={"h3"}>
                Запуск курса
            </Text>
            <Table highlightOnHover>
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