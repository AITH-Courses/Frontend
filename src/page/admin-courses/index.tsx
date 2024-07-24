import {useMe} from "../../hooks/auth";
import {Button, Skeleton, Stack, Text, Table, Group, Space, MantineColor, Anchor, Badge, Modal} from "@mantine/core";
import React from "react";
import AdminLayout from "../../layouts/admin-layout";
import {useCourses} from "../../hooks/admin/courses.ts";
import {ICourseCard} from "../../types/courses.ts";
import {useNavigate} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {CreateCourseModal} from "./modals.tsx";

const AdminCoursesPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()
    const {isError: isNoUserError} = useMe();
    const {data, isFetching} = useCourses()

    if (isNoUserError){
        return (
            <AdminLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Доступ к админ-панели доступен только организаторам
                    </Text>
                    <Button variant="filled" size="sm" color="dark" onClick={() => navigate("/login")}>
                        Войти в аккаунт
                    </Button>
                </Stack>
            </AdminLayout>
        )

    }

    if (isFetching) {
        return <AdminLayout>
            <Skeleton h={36}/>
            <Space h={"sm"}/>
            <Skeleton h={200}/>
        </AdminLayout>
    }

    const rows = data && (data as Array<ICourseCard>).map((course) => (
        <Table.Tr
            key={course.name}
        >
            <Table.Td>
                <Anchor component="button" fz="sm" onClick={() => navigate("/admin/courses/" + course.id)}>
                    <Text fw={700}>{course.name}</Text>
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Badge color="grey" variant="outline">
                    {
                        course.is_draft? "Скрыт": "Открыт"
                    }
                </Badge>
            </Table.Td>
            <Table.Td visibleFrom={"sm"}>
                {
                    course.implementer
                    ? <Badge color="orange" variant="outline">{course.implementer}</Badge>
                    : "Не указано"
                }
            </Table.Td>
            <Table.Td visibleFrom={"xs"}>
                {
                    course.format
                    ? <Badge color="black" variant="outline">{course.format}</Badge>
                    : "Не указано"
                }
            </Table.Td>
            <Table.Td visibleFrom={"xs"}>
                <Group>
                    {course.roles.sort().map(role => (
                        <Badge color="blue">{role}</Badge>
                    ))}
                </Group>
                {
                    course.roles.length === 0
                    ? "Не указаны"
                    : null
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
                        <Table.Th><Text fw={700}>Статус</Text></Table.Th>
                        <Table.Th visibleFrom={"sm"}><Text fw={700}>Реализатор</Text></Table.Th>
                        <Table.Th visibleFrom={"xs"}><Text fw={700}>Формат</Text></Table.Th>
                        <Table.Th visibleFrom={"xs"}><Text fw={700}>Роли</Text></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </AdminLayout>
    )
}

export default AdminCoursesPage;