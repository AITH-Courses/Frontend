import {Stack, Button, TextInput, Select} from "@mantine/core";
import React, {useState} from "react";
import {useCreatePlaylist} from "../../../hooks/admin/playlists.ts";
import {ICreateUpdatePlaylist} from "../../../types/playlists.ts";
import {VIDEO_RESOURCE_TYPES} from "../../../constants";

interface CreatePlaylistModalProps {
    courseId: string,
    courseRunId: string,
    closeModal: () => void
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = (props) => {
    const {courseId, courseRunId, closeModal} = props;
    const [playlist, setPlaylist] = useState<ICreateUpdatePlaylist>({name: "", type: VIDEO_RESOURCE_TYPES[0], link: ""});

    const {mutateAsync, isPending, isSuccess} = useCreatePlaylist(courseId, courseRunId);

    if (isSuccess){
        closeModal()
    }

    return (
        <Stack px={16} py={16}>
            <TextInput
                label="Название"
                placeholder={"Плейлист на площадке..."}
                value={playlist.name}
                onChange={e => setPlaylist({...playlist, name: e.target.value})}
            />
            <Select
                withAsterisk
                label="Тип"
                data={VIDEO_RESOURCE_TYPES}
                value= {playlist.type}
                onChange={(value) => setPlaylist({...playlist, type: value})}
            />
            <TextInput
                label="Ссылка"
                placeholder={"Ссылка на плейлист..."}
                value={playlist.link}
                onChange={e => setPlaylist({...playlist, link: e.target.value})}
            />
            <Button variant={"filled"} color="black" loading={isPending} onClick={() => mutateAsync(playlist)}>
                Создать
            </Button>
        </Stack>
    )
}

export {CreatePlaylistModal};