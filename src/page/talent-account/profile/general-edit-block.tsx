import {ActionIcon, Avatar, Button, Divider, Group, Stack, TextInput, ImageProps, FileButton} from "@mantine/core";
import {IconCheck, IconX} from "@tabler/icons-react";
import React, {useEffect, useRef, useState} from "react";
import {ICreatedTalentAvatar, ITalentProfile} from "../../../types/talent-profile.ts";
import {useCreateTalentAvatar} from "../../../hooks/talent-profile/profile.ts";

interface GeneralEditBlockProps {
    profile: ITalentProfile,
    saveProfileGeneral: (data: ITalentProfile) => void,
    cancelEditing: () => void
}

const GeneralEditBlock: React.FC<GeneralEditBlockProps> = (props) => {
    const {mutateAsync: loadTalentAvatar, data: loadedTalentAvatar} = useCreateTalentAvatar();
    const imageRef = useRef(null);
    const {profile: oldProfile, saveProfileGeneral, cancelEditing} = props;
    const [profile, setProfile] = useState<ITalentProfile>(oldProfile)

    useEffect(() => {
        if (loadedTalentAvatar !== undefined){
            (imageRef.current as ImageProps).src = (loadedTalentAvatar as ICreatedTalentAvatar).URL
            setProfile(prevState => ({
                ...(prevState as ITalentProfile), image_url: (loadedTalentAvatar as ICreatedTalentAvatar).URL
            }))
        }
    }, [loadedTalentAvatar]);

    return (
        <div className="block">
            <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="72px" onClick={() => saveProfileGeneral(profile)} title="Сохранить изменения">
                <IconCheck color="black" size="2rem"  stroke={1} />
            </ActionIcon>
            <ActionIcon variant="transparent" size="xl" aria-label="Settings" pos="absolute" top="24px" right="24px" onClick={cancelEditing} title="Отменить">
                <IconX color="black" size="2rem"  stroke={1} />
            </ActionIcon>
            <Group>
                <Stack gap="xs">
                    <Avatar
                        ref={imageRef}
                        src={profile.image_url}
                        alt={profile.firstname + " " + profile.lastname}
                        color="initials"
                        name={profile.firstname + " " + profile.lastname}
                        radius={100}
                        size={100}
                        mih={100}
                    />
                    <FileButton onChange={file => file && loadTalentAvatar(file)} accept="image/png,image/jpeg">
                        {(props) => (
                            <Button
                                fullWidth
                                onClick={props.onClick}
                                color="gray"
                                variant="outline"
                            >
                                Изменить
                            </Button>
                        )}
                    </FileButton>
                </Stack>
                <Stack gap="xs" style={{flexGrow: 1}}>
                    <TextInput
                        description={"Имя"}
                        placeholder={"Иван"}
                        value={profile.firstname}
                        onChange={(event) => setProfile({...profile, firstname: event.currentTarget.value})}
                    />
                    <TextInput
                        description={"Фамилия"}
                        placeholder={"Иванов"}
                        value={profile.lastname}
                        onChange={(event) => setProfile({...profile, lastname: event.currentTarget.value})}
                    />
                </Stack>
            </Group>
            <Divider my={"md"}/>
            <Stack gap="xs">
                <TextInput
                    description={"Место проживания"}
                    placeholder={"Например, Россия/Москва"}
                    value={profile.location}
                    onChange={(event) => setProfile({...profile, location: event.currentTarget.value})}
                />
                <TextInput
                    description={"Компания"}
                    placeholder={"Например, AI Talent Hub"}
                    value={profile.company}
                    onChange={(event) => setProfile({...profile, company: event.currentTarget.value})}
                />
                <TextInput
                    description={"Позиция"}
                    placeholder={"Например, ML Engineer"}
                    value={profile.position}
                    onChange={(event) => setProfile({...profile, position: event.currentTarget.value})}
                />
            </Stack>
        </div>
    )
}
export default GeneralEditBlock;