import TalentProfileLayout from "../../../layouts/talent-profile-layout";
import {Grid} from "@mantine/core";
import "./index.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useProfile, useUpdateProfileGeneral, useUpdateProfileLinks} from "../../../hooks/talent-profile/profile.ts";
import {ITalentProfile} from "../../../types/talent-profile.ts";
import GeneralBlock from "./general-block.tsx";
import GeneralEditBlock from "./general-edit-block.tsx";
import LinksBlock from "./links-block.tsx";
import LinksEditBlock from "./links-edit-block.tsx";

const ProfilePage = () => {
    const navigate = useNavigate()
    const {data, isSuccess, isError, isLoading} = useProfile();
    const {mutateAsync: updateProfileGeneral} = useUpdateProfileGeneral()
    const {mutateAsync: updateProfileLinks} = useUpdateProfileLinks()
    const [profile, setProfile] = useState<ITalentProfile | null>(null)
    const [isEditGeneral, setIsEditGeneral] = useState(false);
    const [isEditLinks, setIsEditLinks] = useState(false);

    useEffect(() => {
        setProfile(data as ITalentProfile);
    }, [data]);

    if (isError){
        navigate("/login")
    }

    const saveProfileGeneral = (profile: ITalentProfile) => {
        setIsEditGeneral(false);
        updateProfileGeneral(profile)
    }

    const saveProfileLinks = (profile: ITalentProfile) => {
        setIsEditLinks(false);
        updateProfileLinks(profile)
    }

    return (
        <TalentProfileLayout>
            <Grid gutter={28} h={"100%"}>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    {
                        isEditGeneral
                        ? profile && <GeneralEditBlock profile={profile} saveProfileGeneral={saveProfileGeneral} cancelEditing={() => setIsEditGeneral(false)}/>
                        : <GeneralBlock profile={profile} isLoading={isLoading} isSuccess={isSuccess} startEditing={() => setIsEditGeneral(true)}/>
                    }
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    {
                        isEditLinks
                        ? profile && <LinksEditBlock profile={profile} saveProfileLinks={saveProfileLinks} cancelEditing={() => setIsEditLinks(false)}/>
                        : <LinksBlock profile={profile} isLoading={isLoading} isSuccess={isSuccess} startEditing={() => setIsEditLinks(true)}/>
                    }
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