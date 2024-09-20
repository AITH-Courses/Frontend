import React from "react";
import { IconCalendarMonth, IconUsers, IconBook, IconMovie } from '@tabler/icons-react';
import {Button, Drawer, Grid, NavLink, Stack} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import "./index.css"
import AdminLayout from "../admin-layout";

const profileTabs = [
    {
        label: "Общее",
        suffix: "",
        icon: IconBook,
        links: []
    },
    {
        label: "Расписание",
        suffix: "/timetable",
        icon: IconCalendarMonth,
        links: [
            { label: 'Правила', suffix: '/rules' },
            { label: 'Google-календарь', suffix: '/google-calendar' },
        ],
    },
    {
        label: "Плейлисты",
        suffix: "/playlists",
        icon: IconMovie,
        links: []
    },
    {
        label: "Студенты",
        suffix: "/members",
        icon: IconUsers,
        links: []
    }
]

export interface AdminCourseRunLayoutProps  {
    children: React.ReactNode
}

interface layoutParams{
    courseId: string,
    courseRunId: string
}

const AdminCourseRunLayout: React.FC<AdminCourseRunLayoutProps> = (props) => {
    const location = useLocation();
    const params = useParams()
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const links= profileTabs.map(item => (
        item.links.length == 0
        ? (
            <NavLink
                key={item.label}
                active={location.pathname == `/admin/courses/${(params as layoutParams).courseId}/runs/${(params as layoutParams).courseRunId}${item.suffix}`}
                label={item.label}
                leftSection={<item.icon c={"#8D8D98"} size="1.5rem" stroke={1} />}
                onClick={() => navigate(`/admin/courses/${(params as layoutParams).courseId}/runs/${(params as layoutParams).courseRunId}${item.suffix}`)}
                color="orange"
                variant="subtle"
            />
        ): (
            <NavLink
                key={item.label}
                active={location.pathname.includes(`/admin/courses/${(params as layoutParams).courseId}/runs/${(params as layoutParams).courseRunId}${item.suffix}`)}
                label={item.label}
                leftSection={<item.icon c={"#8D8D98"} size="1.5rem" stroke={1} />}
                onClick={() => navigate(`/admin/courses/${(params as layoutParams).courseId}/runs/${(params as layoutParams).courseRunId}${item.suffix}`)}
                color="orange"
                variant="subtle"
                childrenOffset={0}
                opened={item.links.reduce((acc, nestedItem) => acc || location.pathname.endsWith(nestedItem.suffix) || location.pathname.endsWith(item.suffix), false)}
            >
                {
                    item.links.map(nestedItem => (
                        <NavLink
                            key={nestedItem.label}
                            active={location.pathname == `/admin/courses/${(params as layoutParams).courseId}/runs/${(params as layoutParams).courseRunId}${item.suffix}${nestedItem.suffix}`}
                            label={nestedItem.label}
                            onClick={() => navigate(`/admin/courses/${(params as layoutParams).courseId}/runs/${(params as layoutParams).courseRunId}${item.suffix}${nestedItem.suffix}`)}
                            color="orange"
                            variant="subtle"
                            ps={48}
                        />
                    ))
                }
            </NavLink>
        )
    ))
    return (
        <AdminLayout>
            <Drawer opened={opened} onClose={close}>
                {links}
            </Drawer>
            <Grid gutter="xl">
                <Grid.Col ps={0} py={0} span="content" visibleFrom="sm">
                    <aside className="course-run__sidebar">
                        {links}
                    </aside>
                </Grid.Col>
                <Grid.Col pe={0} py={0} span="auto">
                    <Stack>
                        <Button variant="outline" color="rgba(0, 0, 0, 1)" hiddenFrom={"sm"} onClick={open}>
                            Открыть меню
                        </Button>
                        {props.children}
                    </Stack>
                </Grid.Col>
            </Grid>
        </AdminLayout>
    )
}
export default AdminCourseRunLayout;