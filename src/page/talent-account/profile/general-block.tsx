import {ActionIcon, Avatar, Divider, Group, Skeleton, Stack, Text, Title} from "@mantine/core";
import {IconPencil} from "@tabler/icons-react";
import React from "react";
import {ITalentProfile} from "../../../types/talent-profile.ts";

interface GeneralBlockProps {
    profile: ITalentProfile | null,
    isLoading: boolean,
    isSuccess: boolean,
    startEditing: () => void
}

const GeneralBlock: React.FC<GeneralBlockProps> = (props) => {
    const {profile, isLoading, isSuccess, startEditing} = props;
    return (
        <div className="block">
            <ActionIcon variant="transparent" size="xl" aria-label="Edit" pos="absolute" top="24px" right="24px" onClick={startEditing} title="Редактировать профиль">
                <IconPencil color="black" size="2rem"  stroke={1} />
            </ActionIcon>
            <Group>
                {
                    isLoading
                        ? <Skeleton height={100} circle/>
                        : isSuccess && profile && (
                        <Avatar
                            src={profile.image_url}
                            alt={profile.firstname + " " + profile.lastname}
                            color="initials"
                            name={profile.firstname + " " + profile.lastname}
                            radius={100}
                            size={100}
                            mih={100}
                        />
                    )
                }
                <Stack justify="flex-start" align="flex-start" gap="xs">
                    {
                        isLoading
                            ? <Skeleton height={30} width={300}/>
                            : isSuccess && profile && (
                            <Title order={3} ta="left">
                                {profile.firstname + " " + profile.lastname}
                            </Title>
                        )
                    }
                    {
                        isLoading
                            ? <Skeleton height={30} width={100}/>
                            : isSuccess && profile && (
                            <Text c="dimmed" size="lg" ta="left" >
                                Талант
                            </Text>
                        )
                    }
                </Stack>
            </Group>
            <Divider my={"md"}/>
            <Group gap="xs" hiddenFrom={"xs"}>
                {
                    isLoading
                        ? <Skeleton height={30} width={"25%"}/>
                        : isSuccess && profile && profile.location !== "" && (
                        <Text c="black" size="lg" ta="left" >
                            {profile.location},
                        </Text>
                    )
                }
                {
                    isLoading
                        ? <Skeleton height={30} width={"25%"}/>
                        : isSuccess && profile && profile.company !== "" && (
                        <Text c="black" size="lg" ta="left" >
                            {profile.company},
                        </Text>
                    )
                }
                {
                    isLoading
                        ? <Skeleton height={30} width={"25%"}/>
                        : isSuccess && profile && profile.position !== "" && (
                        <Text c="black" size="lg" ta="left" >
                            {profile.position}
                        </Text>
                    )
                }
            </Group>
            <Stack gap="xs" visibleFrom={"xs"}>
                {
                    isLoading
                        ? <Skeleton height={30} width={"100%"}/>
                        : isSuccess && profile && profile.location !== "" && (
                        <Group gap="xs">
                            <Text fw={"bold"} c="black" size="lg" ta="left" w={120} >
                                Локация
                            </Text>
                            <Text c="black" size="lg" ta="left" >
                                {profile.location}
                            </Text>
                        </Group>
                    )
                }
                {
                    isLoading
                        ? <Skeleton height={30} width={"100%"}/>
                        : isSuccess && profile && profile.company !== "" && (
                        <Group gap="xs">
                            <Text fw={"bold"} c="black" size="lg" ta="left" w={120} >
                                Компания
                            </Text>
                            <Text c="black" size="lg" ta="left" >
                                {profile.company}
                            </Text>
                        </Group>
                    )
                }
                {
                    isLoading
                        ? <Skeleton height={30} width={"100%"}/>
                        : isSuccess && profile && profile.position !== "" && (
                        <Group gap="xs">
                            <Text fw={"bold"} c="black" size="lg" ta="left" w={120} >
                                Позиция
                            </Text>
                            <Text c="black" size="lg" ta="left" >
                                {profile.position}
                            </Text>
                        </Group>
                    )
                }
            </Stack>
        </div>
    )
}
export default GeneralBlock;