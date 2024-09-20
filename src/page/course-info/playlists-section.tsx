import {Anchor, Button, Flex, Group, Skeleton, Stack, Text} from "@mantine/core";
import React from "react";
import {AxiosError} from "axios";
import {useCoursePlaylists} from "../../hooks/playlists";
import {IPlaylist} from "../../types/playlists.ts";
import {IconBrandVk, IconBrandYoutube} from "@tabler/icons-react";

interface PlaylistsSectionProps {
    courseId: string
}

const PlaylistsSection: React.FC<PlaylistsSectionProps> = (props) => {
    const {courseId} = props;
    const {data, isSuccess, isError, error, isFetching} = useCoursePlaylists(courseId);

    if (isFetching) {
        return <Stack px={16} pt={16}>
            <Skeleton h={36}/>
            <Skeleton h={200}/>
        </Stack>
    }

    if (isError) {
        return <Stack px={16} pt={16}>
            <Text c="dimmed" size="lg" ta="left" >
                {(error as AxiosError).response.data.message}
            </Text>
        </Stack>
    }

    const playlists = isSuccess && data && (data as Array<IPlaylist>);
    return (
        <Stack px={16} pt={16}>
            <Group gap={12}>
            {
                playlists && playlists.map(playlist => (
                    <Group key={playlist.id} gap={4}>
                        <Text size="lg" ta="left">
                            {playlist.name}
                        </Text>
                        <Anchor component={"a"} fz="sm" href={playlist.link} target="_blank" c="blue">
                            <Button
                                variant="outline"
                                color="black"
                                rightSection={playlist.type === "vk"? <IconBrandVk color="black"/>: <IconBrandYoutube color="black"/>}
                            >
                                {
                                    playlist.name === ""
                                        ? "Плейлист с записями занятий"
                                        : playlist.name
                                }
                            </Button>
                        </Anchor>
                    </Group>
                ))
            }
            </Group>
        </Stack>
    )
}
export default PlaylistsSection;