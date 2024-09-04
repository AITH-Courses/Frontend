import DefaultLayout from "../../layouts/default-layout";
import CoursesFilter from "../../components/course-filter";
import React from "react";
import {ICourseFilters} from "../../types/filters.ts";
import {Flex, Grid, Group, Pagination, Space, Stack, Text, Title} from "@mantine/core";
import CourseCard from "../../components/course-card";
import {useSearchParams} from "react-router-dom";
import {useCourses} from "../../hooks/courses";
import EmptyCourseCard from "../../components/empty-course-card";
import {ICoursesWithPage} from "../../types/courses.ts";


export default function CoursesPage(){
    const [search, setSearch] = useSearchParams();
    const initialFilters: ICourseFilters = {
        implementers: search.getAll("implementer"),
        roles: search.getAll("role"),
        terms: search.getAll("term"),
        formats: search.getAll("format"),
        only_actual: search.get("only_actual") === "yes",
    }
    const page = search.get("page") != null? +search.get("page"): 1
    const {data, isSuccess, isFetching, isError} = useCourses({...initialFilters, page: page});

    const applyFilters = (filters: ICourseFilters) => {
        setSearch({
            implementer: filters.implementers,
            role: filters.roles,
            term: filters.terms,
            format: filters.formats,
            only_actual: filters.only_actual? "yes": "no",
            page: "1",
        });
    }
    const setPage = (value: number) => {
        setSearch({
            implementer: initialFilters.implementers,
            role: initialFilters.roles,
            term: initialFilters.terms,
            format: initialFilters.formats,
            only_actual: initialFilters.only_actual? "yes": "no",
            page: value.toString()
        });
    }

    return (
        <>
            <DefaultLayout>
                <Grid gutter="lg" align="stretch">
                    <Grid.Col span={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
                        <CoursesFilter
                            key={JSON.stringify(initialFilters)}
                            initialFilters={initialFilters}
                            applyFilters={applyFilters}
                            loading={isFetching}
                        />
                    </Grid.Col>
                    <Grid.Col span={{xs: 12, sm: 8, md: 9, lg: 10}}>
                        <Grid gutter="sm">
                            {
                                !isFetching && isSuccess && (data as ICoursesWithPage).courses.map(card => (
                                    <Grid.Col span={{ xs: 12, md: 6, lg: 4 }} key={card.id} p={16}>
                                        <CourseCard card={card}/>
                                    </Grid.Col>
                                ))
                            }
                            {
                                !isFetching && isError && (
                                    <Grid.Col span={{ xs: 12}}>
                                        <Stack gap={"xs"}>
                                            <Space h="lg" />
                                            <Title order={3} ta={"center"}>
                                                Похоже, ничего не нашлось...
                                            </Title>
                                            <Text c="dimmed" size="lg" ta={"center"}>
                                                Попробуйте изменить фильтры
                                            </Text>
                                        </Stack>
                                    </Grid.Col>
                                )
                            }
                            {
                                isFetching &&  [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                                    <Grid.Col key={value} span={{ xs: 12, md: 6, lg: 4 }} p={16}>
                                        <EmptyCourseCard/>
                                    </Grid.Col>
                                ))
                            }
                        </Grid>
                        {
                            !isFetching && isSuccess && (
                                <Flex
                                    justify="center"
                                    align="center"
                                    direction={"column"}
                                >
                                    <Space h="xl"/>
                                    <Pagination
                                        visibleFrom={"xs"}
                                        gap={4}
                                        color="black"
                                        boundaries={1}
                                        siblings={1}
                                        total={(data as ICoursesWithPage).max_page}
                                        value={page}
                                        onChange={setPage}
                                        size="md"
                                    />
                                    <Pagination.Root
                                        hiddenFrom={"xs"}
                                        total={(data as ICoursesWithPage).max_page}
                                        value={page}
                                        onChange={setPage}
                                        gap={8}
                                    >
                                        <Group gap={12} justify="center">
                                            <Pagination.First />
                                            <Pagination.Previous />
                                            <Text>{page}</Text>
                                            <Pagination.Next />
                                            <Pagination.Last />
                                        </Group>
                                    </Pagination.Root>
                                </Flex>
                            )
                        }
                    </Grid.Col>
                </Grid>
            </DefaultLayout>
        </>
    )
}