import {Stack, Button, TextInput, Select} from "@mantine/core";
import React, {useState} from "react";
import {ICreateUpdatePlaylist, IPlaylist} from "../../../types/playlists.ts";
import {VIDEO_RESOURCE_TYPES} from "../../../constants";
import {useUpdatePlaylist} from "../../../hooks/admin/playlists.ts";

interface UpdatePlaylistModalProps {
    courseId: string,
    courseRunId: string,
    playlist: IPlaylist,
    closeModal: () => void
}

const UpdatePlaylistModal: React.FC<UpdatePlaylistModalProps> = (props) => {
    const {courseId, courseRunId, playlist, closeModal} = props;
    const [playlistData, setPlaylistData] = useState<ICreateUpdatePlaylist>({name: playlist.name, type: playlist.type, link: playlist.link});

    const {mutateAsync, isPending, isSuccess} = useUpdatePlaylist(courseId, courseRunId, playlist.id);

    if (isSuccess){
        closeModal()
    }

    return (
        <Stack px={16} py={16}>
            <TextInput
                label="Название"
                placeholder={"Плейлист на площадке..."}
                value={playlistData.name}
                onChange={e => setPlaylistData({...playlistData, name: e.target.value})}
            />
            <Select
                withAsterisk
                label="Тип"
                data={VIDEO_RESOURCE_TYPES}
                value= {playlistData.type}
                onChange={(value) => setPlaylistData({...playlistData, type: value})}
            />
            <TextInput
                label="Ссылка"
                placeholder={"Ссылка на плейлист..."}
                value={playlistData.link}
                onChange={e => setPlaylistData({...playlistData, link: e.target.value})}
            />
            <Button variant={"filled"} color="black" loading={isPending} onClick={() => mutateAsync(playlistData)}>
                Сохранить
            </Button>
        </Stack>

    )
}

export {UpdatePlaylistModal};