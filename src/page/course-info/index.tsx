import DefaultLayout from "../../layouts/default-layout";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useCourseById} from "../../hooks/courses";
import {ICourseInfo} from "../../types/courses.ts";
import {Grid, Image, Skeleton, Space, Stack, Tabs, Text, Button, List} from "@mantine/core";
import React from "react";
import FeedbackSection from "./feedback-section.tsx";

const CourseInfoPage = () => {
    const {courseId} = useParams();
    const {data, isFetching, isSuccess, isError} = useCourseById(courseId.toString())

    const navigate = useNavigate();

    if (isError){
        return (
            <DefaultLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Такого курса не существует или он скрыт организаторами
                    </Text>
                    <Button variant="filled" size="sm" color="black" onClick={() => navigate("/courses")}>
                        Перейти к доступным курсам
                    </Button>
                </Stack>
            </DefaultLayout>
        )
    }

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
                            ? <Skeleton height={34} width={"100%"} radius="sm" />
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
                            ? (
                                <>
                                <Skeleton height={25} width={"100%"} radius="sm"/>
                                <Space h={4}/>
                                </>
                            )
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Реализатор: {(data as ICourseInfo).implementer}
                                    </Text>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <>
                                    <Skeleton height={25} width={"100%"} radius="sm"/>
                                    <Space h={4}/>
                                </>
                            )
                            : isSuccess
                                ?  (
                                    <Text size="lg">
                                        Лимиты:
                                        {
                                            (data as ICourseInfo).limits == null
                                                ? " нет"
                                                : ` ${(data as ICourseInfo).limits}`
                                        }
                                    </Text>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <>
                                    <Skeleton height={25} width={"100%"} radius="sm"/>
                                    <Space h={4}/>
                                </>
                            )
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
                            ? (
                                <>
                                    <Skeleton height={25} width={"100%"} radius="sm"/>
                                    <Space h={4}/>
                                </>
                            )
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
                            ? (
                                <>
                                    <Skeleton height={25} width={"100%"} radius="sm"/>
                                    <Space h={4}/>
                                </>
                            )
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
                            ? (
                                <>
                                    <Skeleton height={25} width={"100%"} radius="sm"/>
                                    <Space h={4}/>
                                </>
                            )
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
                            : isSuccess
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Авторы</Text>
                                        <p style={{whiteSpace: "pre-wrap"}}>
                                            {data.author}
                                        </p>
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
                        : isSuccess && (data as ICourseInfo).prerequisites !== null && (data as ICourseInfo).prerequisites !== ""
                            ? (
                                <div>
                                    <Text fw={600} fz={"h3"}>Пререквизиты</Text>
                                    <p style={{whiteSpace: "pre-wrap"}}>
                                        {data.prerequisites}
                                    </p>
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
                                        <p style={{whiteSpace: "pre-wrap"}}>
                                            {data.description}
                                        </p>
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
                                        <p style={{whiteSpace: "pre-wrap"}}>
                                            {data.topics}
                                        </p>
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
                                        <p style={{whiteSpace: "pre-wrap"}}>
                                            {data.assessment}
                                        </p>
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
                            : isSuccess && data && (data as ICourseInfo).resources.length
                                ? (
                                    <div>
                                        <Text fw={600} fz={"h3"}>Рекомендуемые источники</Text>
                                        <List listStyleType="disc">
                                            {
                                                (data as ICourseInfo).resources.map(res => (
                                                    <List.Item key={res.title}>
                                                        {
                                                            res.link.trim() === ""
                                                            ? (
                                                                <p>
                                                                    {res.title}
                                                                </p>
                                                            )
                                                            : (
                                                                <NavLink to={res.link} target="_blank">
                                                                    {res.title}
                                                                </NavLink>
                                                            )
                                                        }
                                                    </List.Item>
                                                ))
                                            }
                                        </List>
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
                                        <p style={{whiteSpace: "pre-wrap"}}>
                                            {data.extra}
                                        </p>
                                    </div>
                                )
                                : null
                    }
                </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="feedback">
                <FeedbackSection courseId={courseId.toString()}/>
            </Tabs.Panel>
        </Tabs>
    </DefaultLayout>
}
export default CourseInfoPage;