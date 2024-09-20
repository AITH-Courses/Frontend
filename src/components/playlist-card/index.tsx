import React from "react";
import {ActionIcon, Anchor, Group, Menu, Modal, Text} from "@mantine/core";
import {IconBrandVk, IconBrandYoutube, IconDots,} from "@tabler/icons-react";
import {useClipboard, useDisclosure} from "@mantine/hooks";
import {IPlaylist} from "../../types/playlists.ts";
import {UpdatePlaylistModal} from "../../page/course-run/playlists/update-playlist-modal.tsx";
import {useDeletePlaylist} from "../../hooks/admin/playlists.ts";
import "./index.css";


interface PlaylistCardProps {
    playlist: IPlaylist,
    courseId: string,
    courseRunId: string,
}

const PlaylistCard: React.FC<PlaylistCardProps> = (props) => {
    const {playlist, courseId, courseRunId} = props;
    const [opened, { open, close }] = useDisclosure(false);
    const {mutateAsync} = useDeletePlaylist(courseId, courseRunId, playlist.id);
    const clipboard = useClipboard();

    const button = (
        <div style={{position: "absolute", top: 0, right: 8}}>
            <Menu offset={-12}>
                <Menu.Target>
                    <ActionIcon variant="transparent" size="xl" aria-label="Settings">
                        <IconDots color="black" size="1.5rem"  stroke={1} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={() => clipboard.copy(playlist.link)}>
                        Копировать ссылку
                    </Menu.Item>
                    <Menu.Item onClick={open}>
                        Редактировать
                    </Menu.Item>
                    <Menu.Item onClick={() => mutateAsync(undefined)}>
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
)
    return (
        <div className={"admin-playlist"}>
            <Modal opened={opened} onClose={close} title="Редактирование существующего правила" centered>
                <UpdatePlaylistModal courseId={courseId} courseRunId={courseRunId} playlist={playlist} closeModal={close}/>
            </Modal>
            {button}
            <Text fw={500}>
                {
                    playlist.name === ""
                        ? "Без названия"
                        : playlist.name
                }
            </Text>
            <Anchor fz="sm" href={playlist.link} target="_blank">
                <Group gap={8} color={"blue"}>
                    {
                        playlist.type === "vk"
                            ? <IconBrandVk />
                            : <IconBrandYoutube />
                    }
                    <Text ta="left" fw={500} >
                        Перейти
                    </Text>
                </Group>
            </Anchor>
        </div>
    )
}
export default PlaylistCard;