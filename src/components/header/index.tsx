import {Burger, Button, Divider, Drawer, Group, Menu, rem, ScrollArea, Stack} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Logo from "../logo";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {IconChevronDown} from "@tabler/icons-react";
import {useLogout, useMe} from "../../hooks/auth";
import {AUTH_TOKEN_KEY} from "../../api/constants.ts";
import "./index.css";
import React from "react";

interface Link{
    name: string
    url: string
}
interface HeaderProps {
    links: Array<Link>
}

const Header: React.FC<HeaderProps> = (props) => {
    const {links} = props;
    const navigate = useNavigate();
    const {data: user, isSuccess, isError, isFetching} = useMe();
    const {mutate, isSuccess: isSuccessLogout, isError: isErrorLogout} = useLogout();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    if (isSuccessLogout || isErrorLogout){
        localStorage.removeItem(AUTH_TOKEN_KEY);
        navigate("/login");
    }


    return(
        <>
            <header>
                <Group justify="space-between" h="100%">
                    <Link className={"logo__link"} to={"/"}>
                        <Logo contrast={false}/>
                    </Link>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        {
                            links.map(link => (
                                <NavLink className={"navbar__link"} to={link.url} end>
                                    {link.name}
                                </NavLink>
                            ))
                        }
                    </Group>

                    {
                        isSuccess
                        ? (
                            <Group visibleFrom="sm">
                                <Menu trigger="click-hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                                    <Menu.Target>
                                        <div style={{display: "flex", columnGap: "4px", alignItems: "center", cursor: "pointer", fontWeight: "bold"}}>
                                            <span>{user.firstname}</span>
                                            <span>{user.lastname}</span>
                                            <IconChevronDown size="20" stroke={1.5} />
                                        </div>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item style={{minWidth: "120px"}} onClick={() => navigate("/profile")}>
                                            Мой профиль
                                        </Menu.Item>
                                        <Menu.Item style={{minWidth: "120px"}} onClick={mutate}>
                                            Выйти
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        )
                        : isError || isFetching
                        ? (
                            <Group visibleFrom="sm">
                                <Button onClick={() => navigate("/login")} radius={100} size="sm" variant="outline" color="black">
                                    Sign in
                                </Button>
                                <Button onClick={() => navigate("/register")} radius={100} size="sm" variant="filled" color="black">
                                    Sign up
                                </Button>
                            </Group>
                        )
                        : <span style={{width: "190px"}}></span>
                    }
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />
                    <Stack
                        align="stretch"
                        justify="center"
                        gap="xs"
                    >
                        {
                            links.map(link => (
                                <NavLink className={"navbar__link"} to={link.url} end>
                                    {link.name}
                                </NavLink>
                            ))
                        }
                    </Stack>
                    <Divider my="sm" />
                    {
                        isSuccess
                        ? (
                            <Stack
                                align="stretch"
                                justify="center"
                                gap="xs"
                            >
                                <NavLink className={"navbar__link"} to={"/profile"}>
                                    {user.firstname} {user.lastname}
                                </NavLink>
                                <div className={"navbar__link"} onClick={mutate}>
                                    Выйти
                                </div>
                            </Stack>
                        )
                        : isError
                            ? (
                                <Group justify="center" grow pb="xl" px="md">
                                    <Button radius={100} size="sm" variant="outline" color="black">Log in</Button>
                                    <Button radius={100} size="sm" variant="filled" color="black">Sign up</Button>
                                </Group>
                            )
                            : null
                    }
                </ScrollArea>
            </Drawer>
        </>
    )
}
export default Header;