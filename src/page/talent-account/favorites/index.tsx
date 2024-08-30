import TalentProfileLayout from "../../../layouts/talent-profile-layout";
import {Button, Divider, Flex, Group, Image, Skeleton, Stack, Text, Title} from "@mantine/core";
import React from "react";
import {useDeleteFavorite, useFavoriteCourses} from "../../../hooks/talent-profile/favorites.ts";
import {IProfileFavoriteCourse} from "../../../types/talent-profile.ts";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

const FavoriteCoursesPage = () => {
    const navigate = useNavigate();
    const {data: favoriteCourses, isSuccess, isError, error, isLoading} = useFavoriteCourses();
    const {mutateAsync: deleteFavoriteCourse} = useDeleteFavorite()

    if (isError){
        if ((error as AxiosError).response.status === 401){
            navigate("/login");
        } else if ((error as AxiosError).response.status === 403){
            navigate("/403");
        }
    }

    return (
        <TalentProfileLayout>
            <div>
                <Title order={2} ta="left">Избранные курсы</Title>
                <Divider my={"md"}/>
                <Stack gap="lg">
                    {
                        isLoading
                            ? [1, 2, 3].map(element => (
                                <Flex
                                    gap="lg"
                                    justify="flex-start"
                                    align="stretch"
                                    direction="row"
                                    wrap="wrap"
                                    key={element}
                                    w={"100%"}
                                >
                                    <Skeleton h={120} w={120}/>
                                    <Stack gap="xs" style={{flexGrow: 1}}>
                                        <Skeleton h={28} w={"100%"}/>
                                        <Skeleton h={24} w={100}/>
                                        <Skeleton h={30} w={120}/>
                                    </Stack>
                                </Flex>
                            ))
                            : isSuccess && (favoriteCourses as Array<IProfileFavoriteCourse>).length == 0
                            ? (
                                <Text c="dimmed" size="lg" ta="left" >
                                    Похоже, вы не добавили еще ни одно курса в избранное
                                </Text>
                            ): isSuccess && (favoriteCourses as Array<IProfileFavoriteCourse>).map(favoriteCourse =>
                            (
                                <Flex
                                    gap="xs"
                                    justify="flex-start"
                                    direction="column"
                                >
                                    <Flex
                                        gap="lg"
                                        justify="flex-start"
                                        align="stretch"
                                        direction="row"
                                        wrap="nowrap"
                                    >
                                        <Image
                                            radius="lg"
                                            src={favoriteCourse.image_url}
                                            alt="Course logo"
                                            h={"120px"}
                                            w={"120px"}
                                            fallbackSrc="https://placehold.co/512x512?text=Нет+лого"
                                        />
                                        <Stack gap="xs" align="flex-start">
                                            <Text c="black" fw={600} size="lg" ta="left" lineClamp={3}>
                                                {favoriteCourse.name}
                                            </Text>
                                            <Text c="dimmed" size="md" ta="left" >
                                                {favoriteCourse.implementer}
                                            </Text>
                                            <Group visibleFrom={"xs"}>
                                                <Button
                                                    variant="outline"
                                                    size="xs"
                                                    color="grey"
                                                    onClick={() => navigate(`/courses/${favoriteCourse.course_id}`)}
                                                >
                                                    Перейти
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="xs"
                                                    color="red"
                                                    onClick={() => deleteFavoriteCourse(favoriteCourse.id)}
                                                >
                                                    Убрать
                                                </Button>
                                            </Group>
                                        </Stack>
                                    </Flex>
                                    <Group grow hiddenFrom={"xs"}>
                                        <Button
                                            variant="outline"
                                            size="xs"
                                            color="grey"
                                            onClick={() => navigate(`/courses/${favoriteCourse.course_id}`)}
                                        >
                                            Перейти
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="xs"
                                            color="red"
                                            onClick={() => deleteFavoriteCourse(favoriteCourse.id)}
                                        >
                                            Убрать
                                        </Button>
                                    </Group>
                                </Flex>
                            )
                        )
                    }
                </Stack>
            </div>
        </TalentProfileLayout>
    )
}

export default FavoriteCoursesPage;