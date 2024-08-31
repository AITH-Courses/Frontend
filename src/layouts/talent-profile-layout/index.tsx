import React from "react";
import {IconBellRinging, IconBooks, IconUserSquareRounded} from '@tabler/icons-react';
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
        icon: IconUserSquareRounded,
    },
    {
        label: "Избранные курсы",
        value: "favorites",
        link: "/profile/favorites",
        icon: IconBooks
    },
    {
        label: "Уведомления",
        value: "notification",
        link: "/profile/notifications",
        icon: IconBellRinging
    },
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
            <Grid gutter="xl" h="100%" className={"app-grid-parent"}>
                <Grid.Col px={12} span="content" visibleFrom="sm">
                    <aside className="sidebar">
                        {links}
                    </aside>
                </Grid.Col>
                <Grid.Col px={12} span="auto">
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