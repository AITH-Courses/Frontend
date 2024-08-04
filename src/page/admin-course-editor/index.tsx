import {useNavigate, useParams} from "react-router-dom";
import {ICourseInfo, ICreatedCourseLogo} from "../../types/courses.ts";
import {
    Grid,
    Image,
    Skeleton,
    Space,
    Stack,
    Tabs,
    Text,
    Button,
    Select,
    MultiSelect,
    TextInput,
    Group, NumberInput, Checkbox, Divider, Textarea, FileInput, rem, ImageProps
} from "@mantine/core";
import React, {useState, useEffect, useRef} from "react";
import {useMe} from "../../hooks/auth";
import {FORMATS, IMPLEMENTERS, ROLES, LAST_RUNS, PERIODS} from "../../constants";
import {
    useDeleteCourse,
    useHideCourse,
    usePublishCourse,
    useUpdateCourse,
    useCourseById,
    useCreateCourseLogo
} from "../../hooks/admin/courses.ts";
import AdminLayout from "../../layouts/admin-layout";
import {IconPhoto} from "@tabler/icons-react";

const AdminCourseEditorPage = () => {
    const {courseId} = useParams();
    const navigate = useNavigate();
    const {isError: isNoUserError} = useMe();
    const {data, isFetching, isSuccess, isError} = useCourseById(courseId.toString())
    const {mutateAsync: mutateUpdate, isPending: isUpdatePending} = useUpdateCourse(courseId.toString())
    const {mutateAsync: mutateDelete, isPending: isDeletePending} = useDeleteCourse(courseId.toString())
    const {mutateAsync: mutatePublish, isPending: isPublishPending} = usePublishCourse(courseId.toString())
    const {mutateAsync: mutateHide, isPending: isHidePending} = useHideCourse(courseId.toString())
    const {mutateAsync: mutateCourseLogo, data: courseLogoData} = useCreateCourseLogo()
    const [courseInfo, setCourseInfo] = useState<ICourseInfo | null>(null);
    const imageRef = useRef(null);
    useEffect(() => {
        setCourseInfo(data as ICourseInfo)
    }, [isSuccess, data]);

    useEffect(() => {
        if (courseLogoData !== undefined){
            (imageRef.current as ImageProps).src = (courseLogoData as ICreatedCourseLogo).URL
            setCourseInfo(prevState => ({
                ...(prevState as ICourseInfo), image_url: (courseLogoData as ICreatedCourseLogo).URL
            }))
        }
    }, [courseLogoData]);

    const saveChanges = () => {
        if (courseInfo){
            mutateUpdate(courseInfo);
        }
    }

    const deleteCourse = () => {
        if (courseInfo){
            mutateDelete(undefined);
        }
    }

    const publishCourse = () => {
        if (courseInfo){
            mutatePublish(undefined);
        }
    }

    const hideCourse = () => {
        if (courseInfo){
            mutateHide(undefined);
        }
    }

    if (isNoUserError){
        return (
            <AdminLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Доступ к админ-панели доступен только организаторам
                    </Text>
                    <Button variant="filled" size="sm" color="dark" onClick={() => navigate("/login")}>
                        Войти в аккаунт
                    </Button>
                </Stack>
            </AdminLayout>
        )

    }
    if (isError){
        return (
            <AdminLayout>
                <Stack align="flex-start">
                    <Text c="black" size="lg" ta="left" >
                        Такого курса не существует
                    </Text>
                    <Button variant="filled" size="sm" color="dark" onClick={() => navigate("/admin/courses")}>
                        Перейти к доступным курсам
                    </Button>
                </Stack>
            </AdminLayout>
        )

    }

    return <AdminLayout>
        <Grid gutter="xs" columns={24}>
            <Grid.Col span={{ base: 24, md: 8, lg: 6 }}>
                {
                    isFetching
                    ? <Skeleton height={250} width={"100%"} radius="lg" />
                    : (
                        <Image
                            ref={imageRef}
                            h={250}
                            radius="lg"
                            src={(data as ICourseInfo).image_url}
                            alt="Изменить логотип курса"
                            fallbackSrc="https://placehold.co/1280x720?text=Нет+логотипа"
                        />
                    )
                }
                <FileInput
                    color={"black"}
                    rightSection={<IconPhoto style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    placeholder="Изменить логотип курса"
                    rightSectionPointerEvents="none"
                    mt="md"
                    onChange={file => file && mutateCourseLogo(file)}
                />
                <Divider my="lg" />
                <Grid gutter={8}>
                    <Grid.Col span={{ base: 12 }}>
                        {
                            isFetching
                            ? <Skeleton height={36} width={"100%"} radius="lg" />
                            :courseInfo?.is_draft
                                ? (
                                    <Text size="md" ta={"center"}>
                                        Курс скрыт
                                    </Text>
                                )
                                : (
                                    <Text size="md" ta={"center"}>
                                        Курс открыт
                                    </Text>
                                )
                        }
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                        {
                            isFetching
                                ? <Skeleton height={36} width={"100%"} radius="lg" />
                                : courseInfo?.is_draft
                                    ? (
                                        <Button variant="outline" size="sm" color="dark" fullWidth onClick={publishCourse} loading={isPublishPending}>
                                            Опубликовать
                                        </Button>
                                    )
                                    : (
                                        <Button variant="outline" size="sm" color="dark" fullWidth onClick={hideCourse} loading={isHidePending}>
                                            Скрыть
                                        </Button>
                                    )
                        }
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
                        {
                            isFetching
                                ? <Skeleton height={36} width={"100%"} radius="lg" />
                                : (
                                    <Button variant="outline" size="sm" color="green" fullWidth onClick={saveChanges} loading={isUpdatePending}>
                                        Сохранить
                                    </Button>
                                )
                        }
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
                        {
                            isFetching
                                ? <Skeleton height={36} width={"100%"} radius="lg" />
                                : (
                                    <Button variant="outline" size="sm" color="red" fullWidth onClick={deleteCourse} loading={isDeletePending}>
                                        Удалить
                                    </Button>
                                )
                        }
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col pt={8} px={16} offset={{xs: 0, md: 1, lg: 1}} span={{ base: 24, md: 15, lg: 17 }}>
                <Stack gap={"xs"}>
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <TextInput
                                        label="Название"
                                        value={courseInfo? (courseInfo as ICourseInfo).name: ""}
                                        onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), name: e.currentTarget.value})}
                                    />
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Select
                                        label="Реализатор"
                                        data={IMPLEMENTERS}
                                        value= {courseInfo? (courseInfo as ICourseInfo).implementer: null}
                                        onChange={(value) => setCourseInfo({...(courseInfo as ICourseInfo), implementer: value})}
                                    />
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={36} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Group>
                                        <Checkbox
                                            checked={courseInfo? (courseInfo as ICourseInfo).limits !== null: false}
                                            onChange={(e) => setCourseInfo({
                                                ...(courseInfo as ICourseInfo),
                                                limits: e.currentTarget.checked? 1: null
                                            })}
                                            label="Есть лимиты по числу участников"
                                            color="black"
                                        />
                                        <NumberInput
                                            size="sm"
                                            min={1}
                                            max={300}
                                            value= {courseInfo? (courseInfo as ICourseInfo).limits: null}
                                            onChange={value => setCourseInfo({...(courseInfo as ICourseInfo), limits: value})}
                                            disabled={courseInfo? (courseInfo as ICourseInfo).limits === null: false}
                                        />
                                    </Group>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <Select
                                        label="Формат курса"
                                        data={FORMATS}
                                        value= {courseInfo? (courseInfo as ICourseInfo).format: null}
                                        onChange={(value) => setCourseInfo({...(courseInfo as ICourseInfo), format: value})}
                                    />
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <MultiSelect
                                        label="Семестры реализации"
                                        data={["1", "2", "3", "4"]}
                                        value={
                                            courseInfo && (courseInfo as ICourseInfo).terms
                                            ? (courseInfo as ICourseInfo).terms.split(", ")
                                            : []
                                        }
                                        onChange={(value) => setCourseInfo({...(courseInfo as ICourseInfo), terms: value.join(", ")})}
                                    />
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <MultiSelect
                                        label="Семестры реализации"
                                        data={PERIODS}
                                        value= {courseInfo? (courseInfo as ICourseInfo).periods: []}
                                        onChange={(value) => setCourseInfo({...(courseInfo as ICourseInfo), periods: value})}
                                    />
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <MultiSelect
                                        label="Роли"
                                        data={ROLES}
                                        value={
                                            courseInfo ? (courseInfo as ICourseInfo).roles: []
                                        }
                                        onChange={(value) => setCourseInfo({...(courseInfo as ICourseInfo), roles: value})}
                                    />
                                )
                                : null
                    }
                    {
                        isFetching
                            ? <Skeleton height={60} width={"100%"} radius="lg" />
                            : isSuccess
                                ?  (
                                    <MultiSelect
                                        label="Запуски"
                                        data={LAST_RUNS}
                                        value={
                                            courseInfo ? (courseInfo as ICourseInfo).last_runs: []
                                        }
                                        onChange={(value) => setCourseInfo({...(courseInfo as ICourseInfo), last_runs: value})}
                                    />
                                )
                                : null
                    }
                </Stack>
            </Grid.Col>
        </Grid>
        <Space h="sm"/>
        <Tabs color="rgba(0, 0, 0, 1)" defaultValue="info">
            <Tabs.List>
                <Tabs.Tab value="info">
                    <Text size="xl">О курсе</Text>
                </Tabs.Tab>
                <Tabs.Tab value="analytics">
                    <Text size="xl">Аналитика</Text>
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
                                    <Stack gap={"xs"}>
                                        <Text fw={600} fz={"h3"}>Преподаватель</Text>
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Имя, фамилия опционально отчетство преподавателя.
                                            Какая учёная степень или должность на текущей работе.
                                            В каких компаниях/проектах работал преподаватель.
                                            Если преподавателей несколько указать краткую информацию о каждом
                                        </Text>
                                        <Textarea
                                            size="md"
                                            radius="md"
                                            placeholder="Начните печатать здесь..."
                                            autosize
                                            minRows={2}
                                            value={courseInfo? (courseInfo as ICourseInfo).author: ""}
                                            onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), author: e.currentTarget.value})}
                                        />
                                    </Stack>
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
                        : isSuccess
                            ? (
                                <Stack gap={"xs"}>
                                    <Text fw={600} fz={"h3"}>Пререквизиты</Text>
                                    <Text c="dimmed" size="lg" ta="left" >
                                        Какие знания, навыки, технологии и инструменты необходимы для освоения курса.
                                        Можно указать ссылку на предшествующий курс.
                                    </Text>
                                    <Textarea
                                        size="md"
                                        radius="md"
                                        placeholder="Начните печатать здесь..."
                                        autosize
                                        minRows={2}
                                        value={courseInfo? (courseInfo as ICourseInfo).prerequisites: ""}
                                        onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), prerequisites: e.currentTarget.value})}
                                    />
                                </Stack>
                            )
                            : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={150} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess
                                ? (
                                    <Stack gap={"xs"}>
                                        <Text fw={600} fz={"h3"}>Описание</Text>
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Общие тезисы о курсе.
                                        </Text>
                                        <Textarea
                                            size="md"
                                            radius="md"
                                            placeholder="Начните печатать здесь..."
                                            autosize
                                            minRows={2}
                                            value={courseInfo? (courseInfo as ICourseInfo).description: ""}
                                            onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), description: e.currentTarget.value})}
                                        />
                                    </Stack>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={150} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess
                                ? (
                                    <Stack gap={"xs"}>
                                        <Text fw={600} fz={"h3"}>Темы</Text>
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Структура курса или какие темы будут затронуты.
                                        </Text>
                                        <Textarea
                                            size="md"
                                            radius="md"
                                            placeholder="Начните печатать здесь..."
                                            autosize
                                            minRows={2}
                                            value={courseInfo? (courseInfo as ICourseInfo).topics: ""}
                                            onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), topics: e.currentTarget.value})}
                                        />
                                    </Stack>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={150} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess
                                ? (
                                    <Stack gap={"xs"}>
                                        <Text fw={600} fz={"h3"}>Оценивание</Text>
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Как будет оцениваться работа студента, будут ли это просто домашки и/или защита проекта.
                                        </Text>
                                        <Textarea
                                            size="md"
                                            radius="md"
                                            placeholder="Начните печатать здесь..."
                                            autosize
                                            minRows={2}
                                            value={courseInfo? (courseInfo as ICourseInfo).assessment: ""}
                                            onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), assessment: e.currentTarget.value})}
                                        />
                                    </Stack>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={150} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess
                                ? (
                                    <Stack gap={"xs"}>
                                        <Text fw={600} fz={"h3"}>Рекомендуемые источники</Text>
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Какими источниками вдохновлен курс (книги, статьи, видео)
                                        </Text>
                                        <Textarea
                                            size="md"
                                            radius="md"
                                            placeholder="Начните печатать здесь..."
                                            autosize
                                            minRows={2}
                                            value={courseInfo? (courseInfo as ICourseInfo).resources: ""}
                                            onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), resources: e.currentTarget.value})}
                                        />
                                    </Stack>
                                )
                                : null
                    }
                    {
                        isFetching
                            ? (
                                <div>
                                    <Skeleton height={150} width={"100%"} radius="sm" />
                                </div>
                            )
                            : isSuccess
                                ? (
                                    <Stack gap={"xs"}>
                                        <Text fw={600} fz={"h3"}>Дополнительная информация</Text>
                                        <Text c="dimmed" size="lg" ta="left" >
                                            Дополнительная информация, которая не относится к предыдущим разделам
                                        </Text>
                                        <Textarea
                                            size="md"
                                            radius="md"
                                            placeholder="Начните печатать здесь..."
                                            autosize
                                            minRows={2}
                                            value={courseInfo? (courseInfo as ICourseInfo).extra: ""}
                                            onChange={(e) => setCourseInfo({...(courseInfo as ICourseInfo), extra: e.currentTarget.value})}
                                        />
                                    </Stack>
                                )
                                : null
                    }
                </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="analytics">
                <Stack px={16} pt={16}>
                    <Text fw={600} fz={"h3"}>
                        Аналитика
                    </Text>
                </Stack>
            </Tabs.Panel>
        </Tabs>
    </AdminLayout>
}
export default AdminCourseEditorPage;