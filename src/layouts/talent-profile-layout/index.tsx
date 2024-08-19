import React from "react";
import { IconUser, IconBellRinging, IconBooks } from '@tabler/icons-react';
import DefaultLayout from "../default-layout";
import {Button, Drawer, Grid, NavLink, Stack} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import "./index.css"

const profileTabs = [
    {
        label: "Профиль",
        value: "profile",
        link: "/profile",
        icon: IconUser,
    },
    {
        label: "Уведомления",
        value: "notification",
        link: "/profile/notifications",
        icon: IconBellRinging
    },
    {
        label: "Избранные курсы",
        value: "favorites",
        link: "/profile/favorites",
        icon: IconBooks
    }
]

export interface TalentProfileLayoutProps  {
    children: React.ReactNode
}

const TalentProfileLayout: React.FC<TalentProfileLayoutProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const links= profileTabs.map(item => (
        <NavLink
            key={item.value}
            active={location.pathname === item.link}
            label={item.label}
            leftSection={<item.icon c={"#8D8D98"} size="1.5rem" stroke={1} />}
            onClick={() => navigate(item.link)}
            color="orange"
            variant="subtle"
        />
    ))
    return (
        <DefaultLayout>
            <Drawer opened={opened} onClose={close}>
                {links}
            </Drawer>
            <Grid gutter="xl">
                <Grid.Col ps={0} py={0} span="content" visibleFrom="sm">
                    <aside className="sidebar">
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
        </DefaultLayout>
    )
}
export default TalentProfileLayout;