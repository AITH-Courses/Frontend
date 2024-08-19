import {Button, Skeleton, Stack, Text, Table, Group, Space, MantineColor, Anchor, Badge, Modal} from "@mantine/core";
import React from "react";
import AdminLayout from "../../layouts/admin-layout";
import {useCourses} from "../../hooks/admin/courses.ts";
import {ICourseCard} from "../../types/courses.ts";
import {useNavigate} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {CreateCourseModal} from "./modals.tsx";
import {AxiosError} from "axios";

const AdminCoursesPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()
    const {data, isFetching, isError, error} = useCourses()

    if (isFetching) {
        return <AdminLayout>
            <Skeleton h={36}/>
            <Space h={"sm"}/>
            <Skeleton h={200}/>
        </AdminLayout>
    }

    if (isError){
        if ([403, 401].includes((error as AxiosError).response.status)){
            navigate("/403");
        }
        return (
            <AdminLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Произошла ошибка при загрузке страницы курсов
                    </Text>
                </Stack>
            </AdminLayout>
        )

    }

    const rows = data && (data as Array<ICourseCard>).map((course) => (
        <Table.Tr
            key={course.name}
        >
            <Table.Td>
                <Anchor component="button" fz="sm" onClick={() => navigate("/admin/courses/" + course.id)}>
                    <Text ta="left" fw={600} c="blue">{course.name}</Text>
                </Anchor>
            </Table.Td>
            <Table.Td visibleFrom={"sm"}>
                {
                    course.implementer
                    ? <Text ta="left" fz={14} fw={400}>{course.implementer}</Text>
                    : <Text ta="left" fz={14} fw={400}>{"Не указан"}</Text>
                }
            </Table.Td>
            <Table.Td visibleFrom={"xs"}>
                {
                    course.format
                    ? <Text ta="left" fz={14} fw={400}>{course.format}</Text>
                    : <Text ta="left" fz={14} fw={400}>{"Не указан"}</Text>
                }
            </Table.Td>
            <Table.Td visibleFrom={"xs"}>
                {
                    course.roles.length === 0
                    ? <Text ta="left" fz={14} fw={400}>{"Не указаны"}</Text>
                    : <Text ta="left" fz={14} fw={400}>{course.roles.sort().join(", ")}</Text>
                }
            </Table.Td>
            <Table.Td>
                {
                    course.is_draft
                        ? <Badge color="grey" variant="filled">Скрыт</Badge>
                        : <Badge color="blue" variant="filled">Открыт </Badge>
                }
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <AdminLayout>
            <Modal opened={opened} onClose={close} title="Создание нового курса" centered>
                <CreateCourseModal/>
            </Modal>
            <Group>
                <Button variant="outline" color={"black" as MantineColor} onClick={open}>Новый</Button>
            </Group>
            <Space h={"sm"}/>
            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th><Text fw={700}>Название</Text></Table.Th>
                        <Table.Th visibleFrom={"sm"}><Text fw={700}>Реализатор</Text></Table.Th>
                        <Table.Th visibleFrom={"xs"}><Text fw={700}>Формат</Text></Table.Th>
                        <Table.Th visibleFrom={"xs"}><Text fw={700}>Роли</Text></Table.Th>
                        <Table.Th><Text fw={700}>Статус</Text></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </AdminLayout>
    )
}

export default AdminCoursesPage;