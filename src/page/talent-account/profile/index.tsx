import TalentProfileLayout from "../../../layouts/talent-profile-layout";
import {
    ActionIcon,
    Anchor,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Title
} from "@mantine/core";
import "./index.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconPencil} from "@tabler/icons-react";
import {useProfile, useUpdateProfileGeneral} from "../../../hooks/talent-profile/profile.ts";
import {ITalentProfile} from "../../../types/talent-profile.ts";
import GeneralBlock from "./general-block.tsx";
import GeneralEditBlock from "./general-edit-block.tsx";

const ProfilePage = () => {
    const navigate = useNavigate()
    const {data, isSuccess, isError, isLoading} = useProfile();
    const {mutateAsync: updateProfileGeneral} = useUpdateProfileGeneral()
    const [profile, setProfile] = useState<ITalentProfile | null>(null)
    const [isEditGeneral, setIsEditeGeneral] = useState(false);

    useEffect(() => {
        setProfile(data as ITalentProfile);
    }, [data]);

    if (isError){
        navigate("/login")
    }

    const saveProfileGeneral = (profile: ITalentProfile) => {
        setIsEditeGeneral(false);
        updateProfileGeneral(profile)
    }

    return (
        <TalentProfileLayout>
            <Grid gutter={28} h={"100%"}>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    {
                        isEditGeneral
                        ? profile && <GeneralEditBlock profile={profile} saveProfileGeneral={saveProfileGeneral} cancelEditing={() => setIsEditeGeneral(false)}/>
                        : <GeneralBlock profile={profile} isLoading={isLoading} isSuccess={isSuccess} startEditMode={() => setIsEditeGeneral(true)}/>
                    }
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <div className="block">
                        <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px">
                            <IconPencil color="black" size="2rem"  stroke={1} />
                        </ActionIcon>
                        <Title order={3} ta="left">Ссылки</Title>
                        <Divider my={"md"}/>
                        <Stack gap="xs">
                            {
                                isLoading
                                    ? <Skeleton height={30} width={"100%"}/>
                                    : isSuccess && profile && profile.link_ru_resume !== "" && (
                                    <Anchor w={"100%"} href={profile.link_ru_resume} target="_blank" underline="hover">
                                        Резюме (RU)
                                    </Anchor>
                                )
                            }
                            {
                                isLoading
                                    ? <Skeleton height={30} width={"100%"}/>
                                    : isSuccess && profile && profile.link_eng_resume !== "" && (
                                    <Anchor w={"100%"} href={profile.link_eng_resume} target="_blank" underline="hover">
                                        Резюме (ENG)
                                    </Anchor>
                                )
                            }
                            {
                                isLoading
                                    ? <Skeleton height={30} width={"100%"}/>
                                    : isSuccess && profile && profile.link_tg_personal !== "" && (
                                    <Anchor w={"100%"} href={profile.link_tg_personal} target="_blank" underline="hover">
                                        Telegram
                                    </Anchor>
                                )
                            }
                            {
                                isLoading
                                    ? <Skeleton height={30} width={"100%"}/>
                                    : isSuccess && profile && profile.link_linkedin !== "" && (
                                    <Anchor w={"100%"} href={profile.link_linkedin} target="_blank" underline="hover">
                                        LinkedIn
                                    </Anchor>
                                )
                            }
                        </Stack>
                    </div>
                </Grid.Col>
                {/*<Grid.Col span={{ base: 12 }}>*/}
                {/*    <div className="block">*/}
                {/*        <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px">*/}
                {/*            <IconPencil color="black" size="2rem"  stroke={1} />*/}
                {/*        </ActionIcon>*/}
                {/*        <Title order={3} ta="left">Навыки</Title>*/}
                {/*        <Group mt={"sm"}>*/}
                {/*            {*/}
                {/*                ["Pytorch", "NLP", "Llama"].map(name => (*/}
                {/*                    <Badge*/}
                {/*                        variant="outline"*/}
                {/*                        color="gray"*/}
                {/*                    >*/}
                {/*                        {name}*/}
                {/*                    </Badge>*/}
                {/*                ))*/}
                {/*            }*/}
                {/*        </Group>*/}
                {/*    </div>*/}
                {/*</Grid.Col>*/}
            </Grid>
        </TalentProfileLayout>
    )
}

export default ProfilePage;