import AdminCourseRunLayout from "../../../layouts/course-run-layout";
import {Button, Divider, Flex, Group, Modal, Skeleton, Stack, Text, Title} from "@mantine/core";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosError} from "axios";
import {useDisclosure} from "@mantine/hooks";
import {usePlaylists} from "../../../hooks/admin/playlists.ts";
import {IPlaylist} from "../../../types/playlists.ts";
import {CreatePlaylistModal} from "./create-playlist-modal.tsx";
import PlaylistCard from "../../../components/playlist-card";


interface pageParams{
    courseId: string,
    courseRunId: string
}

const CourseRunPlaylistsPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const {data, isSuccess, isLoading, isError, error} = usePlaylists((params as pageParams).courseId, (params as pageParams).courseRunId);

    if (isError){
        if ((error as AxiosError).response.status === 401){
            navigate("/login");
        }
        if ((error as AxiosError).response.status === 403){
            navigate("/403");
        }
        return (
            <AdminCourseRunLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Произошла ошибка при загрузке страницы запуска, возможно его не существует
                    </Text>
                    <Button variant="filled" size="sm" color="dark" onClick={() => navigate(`/admin/courses/${(params as pageParams).courseId}`)}>
                        Вернуться к курсу
                    </Button>
                </Stack>
            </AdminCourseRunLayout>
        )
    }

    const playlists = isSuccess && data && (data as Array<IPlaylist>).map(playlist => (
        <PlaylistCard
            key={playlist.id}
            courseId={(params as pageParams).courseId}
            courseRunId={(params as pageParams).courseRunId}
            playlist={playlist}
        />
    ))

    return (
        <AdminCourseRunLayout>
            <Modal opened={opened} onClose={close} title="Создание нового плейлиста" centered>
                <CreatePlaylistModal
                    courseId={(params as pageParams).courseId}
                    courseRunId={(params as pageParams).courseRunId}
                    closeModal={close}
                />
            </Modal>
            <Group>
                {
                    isLoading
                    ? <Skeleton height={36} width={"100%"} radius="lg" />
                    : (
                        <>
                            <Title order={2} ta="left">
                                Плейлисты
                            </Title>
                            <Button variant="outline" color="black" radius="xl" onClick={open}>
                                Новый
                            </Button>
                        </>
                    )
                }
            </Group>
            <Divider/>
            <Flex
                mih={50}
                gap="md"
                justify="flex-start"
                align="stretch"
                direction="row"
                wrap="wrap"
            >
                {
                    isLoading
                    ? <Skeleton height={130} width={"100%"} radius="lg" />
                    : (data as Array<IPlaylist>).length > 0
                        ? playlists
                        : <Text>Плейлисты отсутствуют</Text>
                }
            </Flex>
        </AdminCourseRunLayout>
    )
}

export default CourseRunPlaylistsPage;