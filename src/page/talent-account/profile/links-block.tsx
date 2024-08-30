import {ActionIcon, Anchor, Divider, Skeleton, Stack, Title} from "@mantine/core";
import {IconPencil} from "@tabler/icons-react";
import React from "react";
import {ITalentProfile} from "../../../types/talent-profile.ts";

interface LinksBlockProps {
    profile: ITalentProfile | null,
    isLoading: boolean,
    isSuccess: boolean,
    startEditing: () => void
}

const LinksBlock: React.FC<LinksBlockProps> = (props) => {
    const {profile, isLoading, isSuccess, startEditing} = props;

    return (
        <div className="block">
            <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px" onClick={startEditing}>
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
    )
}

export default LinksBlock;