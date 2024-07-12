import DefaultLayout from "../../layouts/default-layout";
import {useParams} from "react-router-dom";
import {useCourseById} from "../../hooks/courses";
import {ICourseInfo} from "../../types/courses.ts";
import {Grid, Image, Skeleton, Space, Stack, Tabs, Text} from "@mantine/core";
import React from "react";

const CourseInfoPage = () => {
    const {courseId} = useParams();
    const {data, isFetching, isSuccess} = useCourseById(courseId.toString())
    return <DefaultLayout>
        <Grid gutter="xs" columns={24}>
            <Grid.Col span={{ base: 24, md: 8, lg: 6 }}>
                {
                    isFetching
                    ? <Skeleton height={250} width={"100%"} radius="lg" />
                    : (
                        <Image
                            h={250}
                            radius="lg"
                            src={(data as ICourseInfo).image_url}
                            alt="Логотип курса"
                            fallbackSrc="https://placehold.co/1280x720?text=Нет+логотипа"
                        />
                    )
                }
            </Grid.Col>
            <Grid.Col pt={8} px={16} offset={{xs: 0, md: 1, lg: 1}} span={{ base: 24, md: 15, lg: 17 }}>
                    {
                        isFetching
                            ? <Skeleton height={34} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Text fw={600} fz={"h3"}>
                                        {(data as ICourseInfo).name}
                                    </Text>
                                )
                                : null
                    }
                    <Space h="xs"/>
                    {
                        isFetching
                            ? <Skeleton height={29} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Реализует {(data as ICourseInfo).implementer}
                                        {
                                            (data as ICourseInfo).limits == null
                                                ? " без лимитов"
                                                : ` с лимитом ${(data as ICourseInfo).limits}`
                                        }
                                    </Text>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={29} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Формат курса: {(data as ICourseInfo).format}
                                    </Text>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={29} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Семестры реализации: {(data as ICourseInfo).terms}
                                    </Text>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={29} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Подойдет для {(data as ICourseInfo).roles.join(", ")}
                                    </Text>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={29} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Последние запуски: {(data as ICourseInfo).last_runs.join(", ")}
                                    </Text>
                                )
                                : null
                    }
            </Grid.Col>
        </Grid>
        <Space h="sm"/>
        <Tabs color="rgba(0, 0, 0, 1)" defaultValue="info">
            <Tabs.List>
                <Tabs.Tab value="info">
                    <Text size="xl">О курсе</Text>
                </Tabs.Tab>
                <Tabs.Tab value="feedback">
                    <Text size="xl">Отзывы</Text>
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="info">
                <Stack px={16} pt={16}>
                    {
                        isFetching
                        ? (
                            <div>
                                <Skeleton height={50} width={"100%"} radius="sm" />
                            </div>
                        )
                        : isSuccess && (data as ICourseInfo).prerequisites !== null && (data as ICourseInfo).prerequisites !== ""
                            ? (
                                <div>
                                    <Text fw={600} fz={"h3"}>Пререквизиты</Text>
                                    <div dangerouslySetInnerHTML={{ __html:  data.prerequisites}} />
                                </div>
                            )
                            : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={50} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess && (data as ICourseInfo).description !== null && (data as ICourseInfo).description !== ""
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Описание</Text>
                                        <div dangerouslySetInnerHTML={{ __html:  data.description}} />
                                    </div>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={50} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess && (data as ICourseInfo).topics !== null && (data as ICourseInfo).topics !== ""
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Изучаемые темы</Text>
                                        <div dangerouslySetInnerHTML={{ __html:  data.topics}} />
                                    </div>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={50} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess && (data as ICourseInfo).assessment !== null && (data as ICourseInfo).assessment !== ""
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Оценивание</Text>
                                        <div dangerouslySetInnerHTML={{ __html:  data.assessment}} />
                                    </div>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={50} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess && (data as ICourseInfo).resources !== null && (data as ICourseInfo).resources !== ""
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Рекомендуемые источники</Text>
                                        <div dangerouslySetInnerHTML={{ __html:  data.resources}} />
                                    </div>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={50} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess && (data as ICourseInfo).extra !== null && (data as ICourseInfo).extra !== ""
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Дополнительная информация</Text>
                                        <div dangerouslySetInnerHTML={{ __html:  data.extra}} />
                                    </div>
                                )
                                : null
                    }
                </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="feedback">
                <Stack px={16} pt={16}>
                    <Text fw={600} fz={"h3"}>
                        Отзывы
                    </Text>
                </Stack>
            </Tabs.Panel>
        </Tabs>
    </DefaultLayout>
}
export default CourseInfoPage;