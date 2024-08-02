import React, {useEffect, useState} from "react";
import {Stack, Button, Fieldset, TextInput, SimpleGrid, Text, Title, Space, Group, PasswordInput} from "@mantine/core";
import DefaultLayout from "../../layouts/default-layout";
import {useMe} from "../../hooks/auth";
import {IUser} from "../../types/auth.ts";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {IFailedOperation} from "../../types/base.ts";
import AdminLayout from "../../layouts/admin-layout";
import {DatePickerInput} from "@mantine/dates";


export default function UserProfilePage(){
    const navigate = useNavigate();
    const {data, isSuccess, isError, error, isLoading} = useMe();
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        setUser(data as IUser);
    }, [data]);

    if (isError && axios.isAxiosError(error)){
        const e = error as AxiosError<IFailedOperation, never>;
        try{
            const errorMessage = e.response.data.message;
            console.log(errorMessage);
        } catch {
            console.error(e);
        }
        navigate("/login");
    }

    if (isLoading || user == null){
        return (
            <DefaultLayout>
                <Title order={2}>
                    Загрузка
                </Title>
            </DefaultLayout>
        )
    }

    const changePersonalInfoFieldset = (
        isSuccess && user
        ? (
            <Fieldset legend={<Text fw={600} size="md">Персональная информация</Text>}>
                <Stack gap="xs">
                    <TextInput
                        label="Имя"
                        placeholder="Иван..."
                        value={user.firstname}
                        onChange={e => user && setUser({...user, firstname: e.target.value})}
                    />
                    <TextInput
                        label="Фамилия"
                        placeholder="Иванов..."
                        value={user.lastname}
                        onChange={e => user && setUser({...user, lastname: e.target.value})}
                    />
                    <DatePickerInput
                        label="Дата рождения"
                        placeholder="Дата рождения"
                    />
                    <Group justify="flex-end">
                        <Button size="xs" variant="filled" color="dark">
                            Сохранить изменения
                        </Button>
                    </Group>
                </Stack>
            </Fieldset>
        ): null
    )

    const changePasswordFieldset = (
        isSuccess && user
            ? (
                <Fieldset legend={<Text fw={600} size="md">Изменение пароля</Text>} >
                    <Stack gap="xs">
                        <PasswordInput
                            size={"sm"}
                            label="Старый пароль"
                        />
                        <PasswordInput
                            size={"sm"}
                            label="Новый пароль"
                        />
                        <PasswordInput
                            size={"sm"}
                            label="Повтор пароля"
                        />
                        <Group justify="flex-end">
                            <Button size="xs" variant="filled" color="dark">
                                Сохранить изменения
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            ): null
    )

    if (isSuccess && user && user.role === "admin"){
        return (
            <AdminLayout>
                <Title order={2}>
                    {"Администратор " + user.firstname}
                </Title>
                <Space h="xs" />
                <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} spacing="xs" verticalSpacing="xs">
                    {changePersonalInfoFieldset}
                    {changePasswordFieldset}
                </SimpleGrid>
            </AdminLayout>
        )
    }

    return (
        <>
            <DefaultLayout>
                <Title order={1}>
                    {"Талант " + user.firstname}
                </Title>
                <Space h="xs" />
                <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} spacing="xs" verticalSpacing="xs">
                    {changePersonalInfoFieldset}
                    {changePasswordFieldset}
                </SimpleGrid>
            </DefaultLayout>
        </>
    )
}