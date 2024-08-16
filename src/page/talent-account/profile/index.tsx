import TalentProfileLayout from "../../../layouts/talent-profile-layout";
import {
    ActionIcon,
    Anchor,
    Avatar,
    Badge,
    Divider,
    Grid,
    Group,
    Skeleton,
    Stack,
    Text,
    Title
} from "@mantine/core";
import "./index.css";
import {useMe} from "../../../hooks/auth";
import React, {useEffect, useState} from "react";
import {IUser} from "../../../types/auth.ts";
import {useNavigate} from "react-router-dom";
import {IconPencil} from "@tabler/icons-react";

const ProfilePage = () => {
    const navigate = useNavigate()
    const {data, isSuccess, isError, isLoading} = useMe();
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        setUser(data as IUser);
    }, [data]);

    if (isError){
        navigate("/login")
    }

    return (
        <TalentProfileLayout>
            <Grid gutter={28} h={"100%"}>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <div className="block">
                        <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px">
                            <IconPencil color="black" size="2rem"  stroke={1} />
                        </ActionIcon>
                        <Group>
                            {
                                isLoading
                                ? <Skeleton height={100} circle/>
                                : isSuccess && user && (
                                    <Avatar
                                        src=""
                                        alt={user.firstname + " " + user.lastname}
                                        color="initials"
                                        name={user.firstname + " " + user.lastname}
                                        radius={100}
                                        size={100}
                                    />
                                )
                            }
                            <Stack justify="flex-start" align="flex-start" gap="xs">
                                {
                                    isLoading
                                        ? <Skeleton height={30} width={300}/>
                                        : isSuccess && user && (
                                            <Title order={3} ta="left">
                                                {user.firstname + " " + user.lastname}
                                            </Title>
                                        )
                                }
                                {
                                    isLoading
                                        ? <Skeleton height={30} width={100}/>
                                        : isSuccess && user && (
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Талант
                                        </Text>
                                    )
                                }
                            </Stack>
                        </Group>
                        <Divider my={"md"}/>
                        <Group gap="xs" hiddenFrom={"xs"}>
                            <Text c="black" size="lg" ta="left" >
                                Россия/Москва,
                            </Text>
                            <Text c="black" size="lg" ta="left" >
                                Яндекс,
                            </Text>
                            <Text c="black" size="lg" ta="left" >
                                NLP Researcher
                            </Text>
                            <Anchor w={"100%"} href="https://t.me/user325235234653" target="_blank" underline="hover">
                                @user325235234653
                            </Anchor>
                            {/*<Button*/}
                            {/*    variant="outline"*/}
                            {/*    rightSection={<IconBrandTelegram/>}*/}
                            {/*    onClick={() => window.open("https://t.me/user325235234653", "blank")}*/}
                            {/*>*/}
                            {/*    Написать в telegram*/}
                            {/*</Button>*/}
                        </Group>
                        <Stack gap="xs" visibleFrom={"xs"}>
                            <Group gap="xs">
                                <Text fw={"bold"} c="black" size="lg" ta="left" w={120} >
                                    Локация
                                </Text>
                                <Text c="black" size="lg" ta="left" >
                                    Россия/Москва
                                </Text>
                            </Group>
                            <Group gap="xs">
                                <Text fw={"bold"}  c="black" size="lg" ta="left" w={120} >
                                    Компания
                                </Text>
                                <Text c="black" size="lg" ta="left" >
                                    Яндекс
                                </Text>
                            </Group>
                            <Group gap="xs">
                                <Text fw={"bold"}  c="black" size="lg" ta="left" w={120}>
                                    Позиция
                                </Text>
                                <Text c="black" size="lg" ta="left" >
                                    NLP Researcher
                                </Text>
                            </Group>
                            <Group gap="xs">
                                <Text fw={"bold"}  c="black" size="lg" ta="left" w={120}>
                                    Контакт
                                </Text>
                                <Anchor href="https://t.me/user325235234653" target="_blank" underline="hover">
                                    @user325235234653
                                </Anchor>
                            </Group>
                        </Stack>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <div className="block">
                        <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px">
                            <IconPencil color="black" size="2rem"  stroke={1} />
                        </ActionIcon>
                        <Title order={3} ta="left">Интересы</Title>
                        <Text c="black" size="lg" ta="left" >
                            Плавание
                        </Text>
                        <Text c="black" size="lg" ta="left" >
                            Хоббихорсинг
                        </Text>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <div className="block">
                        <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px">
                            <IconPencil color="black" size="2rem"  stroke={1} />
                        </ActionIcon>
                        <Title order={3} ta="left">Профессиональные навыки</Title>
                        <Group mt={"sm"}>
                            {
                                ["Pytorch", "NLP", "Llama"].map(name => (
                                    <Badge
                                        variant="outline"
                                        color="gray"
                                    >
                                        {name}
                                    </Badge>
                                ))
                            }
                        </Group>
                    </div>
                </Grid.Col>
            </Grid>
        </TalentProfileLayout>
    )
}

export default ProfilePage;