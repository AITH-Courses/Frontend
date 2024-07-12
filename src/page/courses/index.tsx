import DefaultLayout from "../../layouts/default-layout";
import CoursesFilter from "../../components/course-filter";
import React from "react";
import {ICourseFilters} from "../../types/filters.ts";
import {Flex, Grid, Space, Stack, Text, Title} from "@mantine/core";
import CourseCard from "../../components/course-card";
import {useSearchParams} from "react-router-dom";
import {useCourses} from "../../hooks/courses";
import EmptyCourseCard from "../../components/empty-course-card";


export default function CoursesPage(){
    const [search, setSearch] = useSearchParams();
    const initialFilters: ICourseFilters = {
        implementers: search.getAll("implementer"),
        roles: search.getAll("role"),
        terms: search.getAll("term"),
        formats: search.getAll("format"),
    }
    const {data, isSuccess, isFetching} = useCourses(initialFilters);

    const applyFilters = (filters: ICourseFilters) => {
        setSearch({
            implementer: filters.implementers,
            role: filters.roles,
            term: filters.terms,
            format: filters.formats,
        });
    }
    return (
        <>
            <DefaultLayout>
                <Grid gutter="xs" align="stretch">
                    <Grid.Col span={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
                        <CoursesFilter initialFilters={initialFilters} applyFilters={applyFilters} loading={isFetching}/>
                    </Grid.Col>
                    <Grid.Col span={{xs: 12, sm: 8, md: 9, lg: 10}}>
                        <Grid gutter="sm">
                            {
                                !isFetching && isSuccess && data.map(card => (
                                    <Grid.Col span={{ xs: 12, md: 6, lg: 4 }} key={card.id}>
                                        <CourseCard card={card}/>
                                    </Grid.Col>
                                ))
                            }
                            {
                                !isFetching && isSuccess && data.length === 0 && (
                                    <Grid.Col span={{ xs: 12}}>
                                        <Stack gap={"xs"}>
                                            <Space h="xl" />
                                            <Title order={3} ta={"center"}>
                                                Похоже ничего не нашлось...
                                            </Title>
                                            <Text c="dimmed" size="lg" ta={"center"}>
                                                Попробуйте изменить параметры поиска
                                            </Text>
                                        </Stack>
                                    </Grid.Col>
                                )
                            }
                            {
                                isFetching &&  [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                                    <Grid.Col key={value} span={{ xs: 12, md: 6, lg: 4 }}>
                                        <EmptyCourseCard/>
                                    </Grid.Col>
                                ))
                            }
                        </Grid>
                    </Grid.Col>
                </Grid>
            </DefaultLayout>
        </>
    )
}