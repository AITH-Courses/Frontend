import {Burger, Button, Divider, Drawer, Group, Menu, rem, ScrollArea, Stack} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Logo from "../logo";
import {Link, NavLink, useNavigate} from "react-router-dom";
import "./index.css";
import {IconChevronDown} from "@tabler/icons-react";
import {useMe} from "../../hooks/auth";

const Header = () => {
    const navigate = useNavigate();
    const {data: user, isSuccess, isError} = useMe();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return(
        <>
            <header>
                <Group justify="space-between" h="100%">
                    <Link className={"logo__link"} to={"/"}>
                        <Logo/>
                    </Link>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <NavLink className={"navbar__link"} to={"/"}>
                            Home
                        </NavLink>
                        <NavLink className={"navbar__link"} to={"/courses"}>
                            Courses
                        </NavLink>
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
                                            My profile
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        )
                        : isError
                        ? (
                            <Group visibleFrom="sm">
                                <Button radius={100} size="sm" variant="outline" color="dark">Log in</Button>
                                <Button radius={100} size="sm" variant="filled" color="dark">Sign up</Button>
                            </Group>
                        )
                        : <span style={{width: "120px"}}></span>
                    }
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Menu"
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
                        <NavLink className={"navbar__link"} to={"/"}>
                            Home
                        </NavLink>
                        <NavLink className={"navbar__link"} to={"/courses"}>
                            Courses
                        </NavLink>
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
                            </Stack>
                        )
                        : isError
                            ? (
                                <Group justify="center" grow pb="xl" px="md">
                                    <Button radius={100} size="sm" variant="outline" color="dark">Log in</Button>
                                    <Button radius={100} size="sm" variant="filled" color="dark">Sign up</Button>
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