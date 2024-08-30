import {ActionIcon, Divider, Stack, TextInput, Title} from "@mantine/core";
import {IconCheck, IconX} from "@tabler/icons-react";
import React, {useState} from "react";
import {ITalentProfile} from "../../../types/talent-profile.ts";

interface LinksBlockProps {
    profile: ITalentProfile,
    saveProfileLinks: (data: ITalentProfile) => void,
    cancelEditing: () => void
}

const LinksEditBlock: React.FC<LinksBlockProps> = (props) => {
    const {profile: oldProfile, saveProfileLinks, cancelEditing} = props;
    const [profile, setProfile] = useState<ITalentProfile>(oldProfile)

    return (
        <div className="block">
            <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="72px" onClick={() => saveProfileLinks(profile)}>
                <IconCheck color="black" size="2rem"  stroke={1} />
            </ActionIcon>
            <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px" onClick={cancelEditing}>
                <IconX color="black" size="2rem"  stroke={1} />
            </ActionIcon>
            <Title order={3} ta="left">Ссылки</Title>
            <Divider my={"md"}/>
            <Stack gap="xs">
                <TextInput
                    description={"Резюме (RU)"}
                    placeholder={"Можно оставить пустым"}
                    value={profile.link_ru_resume}
                    onChange={(event) => setProfile({...profile, link_ru_resume: event.currentTarget.value})}
                />
                <TextInput
                    description={"Резюме (ENG)"}
                    placeholder={"Можно оставить пустым"}
                    value={profile.link_eng_resume}
                    onChange={(event) => setProfile({...profile, link_eng_resume: event.currentTarget.value})}
                />
                <TextInput
                    description={"Ссылка на Telegram"}
                    placeholder={"Можно оставить пустым"}
                    value={profile.link_tg_personal}
                    onChange={(event) => setProfile({...profile, link_tg_personal: event.currentTarget.value})}
                />
                <TextInput
                    description={"Ссылка на LinkedIn"}
                    placeholder={"Можно оставить пустым"}
                    value={profile.link_linkedin}
                    onChange={(event) => setProfile({...profile, link_linkedin: event.currentTarget.value})}
                />
            </Stack>
        </div>
    )
}

export default LinksEditBlock;