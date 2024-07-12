import React, {useState} from "react";
import {Button, Checkbox, Drawer, Group, Stack, Text} from "@mantine/core";
import {FORMATS, IMPLEMENTERS, ROLES, TERMS} from "../../constants";
import {ICourseFilters} from "../../types/filters.ts";
import {useDisclosure} from "@mantine/hooks";

interface CourseFilterProps {
    initialFilters: ICourseFilters,
    applyFilters: (filters: ICourseFilters) => void,
    loading: boolean,
}

const CoursesFilter: React.FC<CourseFilterProps> = (props) => {
    const {initialFilters, applyFilters, loading} = props;
    const [filters, setFilters] = useState<ICourseFilters>(initialFilters);
    const [opened, { open, close }] = useDisclosure(false);

    const toggleItemInList = (list: Array<string>, item: string) =>{
        if (list.includes(item)){
            return list.filter(value => value !== item);
        }
        return [...list, item];
    }

    const filtersElements = (
        <Stack>
            <Text fw={600} fz={"h3"}>Фильтры</Text>
            <Stack gap="xs">
                <Text size="md">Роли</Text>
                {
                    ROLES.map(role =>
                        <Checkbox
                            key={role}
                            checked={filters.roles.includes(role)}
                            onChange={() => setFilters({...filters, roles: toggleItemInList(filters.roles, role)})}
                            label={role}
                            color="black"
                        />
                    )
                }
            </Stack>
            <Stack gap="xs">
                <Text size="md">Реализаторы</Text>
                {
                    IMPLEMENTERS.map(implementer =>
                        <Checkbox
                            key={implementer}
                            checked={filters.implementers.includes(implementer)}
                            onChange={() => setFilters({...filters, implementers: toggleItemInList(filters.implementers, implementer)})}
                            label={implementer}
                            color="black"
                        />
                    )
                }
            </Stack>
            <Stack gap="xs">
                <Text size="md">Форматы</Text>
                {
                    FORMATS.map(format =>
                        <Checkbox
                            key={format}
                            checked={filters.formats.includes(format)}
                            onChange={() => setFilters({...filters, formats: toggleItemInList(filters.formats, format)})}
                            label={format}
                            color="black"
                        />
                    )
                }
            </Stack>
            <Stack gap="xs">
                <Text size="md">Семестры</Text>
                {
                    TERMS.map(term =>
                        <Checkbox
                            key={term}
                            checked={filters.terms.includes(term)}
                            onChange={() => setFilters({...filters, terms: toggleItemInList(filters.terms, term)})}
                            label={term}
                            color="black"
                        />
                    )
                }
            </Stack>
            <Group gap="xs">
                <Button
                    variant="outline"
                    color="rgba(0, 0, 0, 1)"
                    fullWidth
                    onClick={() => {close(); applyFilters(filters)}}
                    loading={loading}
                    loaderProps={{ type: 'dots' }}
                >
                    Применить
                </Button>
                <Button
                    variant="filled"
                    color="rgba(0, 0, 0, 1)"
                    fullWidth
                    onClick={() => setFilters({terms: [], implementers: [], formats: [], roles: []})}
                >
                    Сбросить
                </Button>
            </Group>
        </Stack>
    )

    return (
        <>
            <Stack visibleFrom="xs">
                {filtersElements}
            </Stack>
            <Stack hiddenFrom="xs">
                <Drawer opened={opened} onClose={close}>
                    {filtersElements}
                </Drawer>
                <Button
                    variant="outline"
                    color="rgba(0, 0, 0, 1)"
                    fullWidth
                    onClick={open}
                >
                    Фильтры
                </Button>
            </Stack>
        </>

    )
}
export default CoursesFilter;