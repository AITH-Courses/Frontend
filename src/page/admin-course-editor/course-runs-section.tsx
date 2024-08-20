import {useCourseRuns} from "../../hooks/course-runs";
import {Anchor, Button, Group, MantineColor, Modal, Skeleton, Stack, Table, Text} from "@mantine/core";
import React from "react";
import {ICourseRun} from "../../types/course-runs.ts";
import {useDisclosure} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {CreateCourseRunModal} from "./modals.tsx";

interface CourseRunsSectionProps {
    courseId: string
}
const CourseRunsSection: React.FC<CourseRunsSectionProps> = (props) => {
    const {courseId} = props;
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const {data, isFetching, isSuccess, isError} = useCourseRuns(courseId)

    if (isFetching) {
        return <Stack>
            <Skeleton h={36}/>
            <Skeleton h={200}/>
        </Stack>
    }

    if (isError) {
        return <Stack>
            <Text c="dimmed" size="lg" ta="left" >
                Недостаточно прав для просмотра информации о запусках
            </Text>
        </Stack>
    }

    const rows = isSuccess && data && (data as Array<ICourseRun>).map((courseRun) => (
        <Table.Tr
            key={courseRun.name}
        >
            <Table.Td>
                <Anchor component="button" fz="sm" onClick={() => navigate(`/admin/courses/${courseId}/runs/${courseRun.id}`)}>
                    <Text ta="left" fw={600} c="blue">{courseRun.name}</Text>
                </Anchor>
            </Table.Td>
            <Table.Td>
                Не запланирован
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack px={16} pt={16}>
            <Modal opened={opened} onClose={close} title="Создание нового запуска" centered>
                <CreateCourseRunModal courseId={courseId}/>
            </Modal>
            <Group>
                <Button variant="outline" color={"black" as MantineColor} onClick={open}>Новый</Button>
            </Group>
            {
                isSuccess && data && (data as Array<ICourseRun>).length == 0
                ? (
                    <Text c="dimmed" size="lg" ta="left" >
                        Нет актуальных запусков для этого курса
                    </Text>
                ): (
                    <Table highlightOnHover>
                        <Table.Thead>
                        <Table.Tr>
                        <Table.Th><Text fw={700}>Название</Text></Table.Th>
                        <Table.Th><Text fw={700}>Статус</Text></Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                )
            }
        </Stack>
    )
}

export default CourseRunsSection;