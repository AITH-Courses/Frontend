import React, {useEffect, useState} from "react";
import {Stack, Skeleton, Button, Fieldset, TextInput, SimpleGrid, Text, Title, Space} from "@mantine/core";
import DefaultLayout from "../../layouts/default-layout";
import {useMe} from "../../hooks/auth";
import {IUser} from "../../types/auth.ts";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {IFailedOperation} from "../../types/base.ts";



export default function UserProfilePage(){
    const navigate = useNavigate();
    const {data, isSuccess, isError, error} = useMe();
    const [user, setUser] = useState<IUser | undefined>(undefined)

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
    if (isSuccess && user && user.role === "admin"){
        navigate("/admin/courses");
    }

    useEffect(() => {
        setUser(data as IUser);
    }, [data]);

    return (
        <>
            <DefaultLayout>
                {
                    isSuccess && user
                        ? (
                            <Title order={1}>
                                {
                                    user.role === "admin"
                                    ? "Администратор " + user.firstname
                                    : "Талант " + user.firstname
                                }
                            </Title>
                        )
                        : (<Skeleton height={44} width={"100%"} />)
                }
                <Space h="xs" />
                <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} spacing="xs" verticalSpacing="xs">
                    <Fieldset legend={<Text fw={600} size="md">Персональная информация</Text>}>
                        <Stack gap="xs">
                            {
                                isSuccess && user
                                    ? (
                                        <TextInput
                                            label="Имя"
                                            placeholder="Иван..."
                                            value={user.firstname}
                                            onChange={e => user && setUser({...user, firstname: e.target.value})}
                                        />
                                    )
                                    : (<Skeleton height={60} width={"100%"} />)
                            }
                            {
                                isSuccess && user
                                    ? (
                                        <TextInput
                                            label="Фамилия"
                                            placeholder="Фамилия..."
                                            value={user.lastname}
                                            onChange={e => user && setUser({...user, lastname: e.target.value})}
                                        />
                                    )
                                    : (<Skeleton height={60} width={"100%"} />)
                            }
                            <Button size="xs" variant="filled" color="dark">
                                Сохранить изменения
                            </Button>
                        </Stack>
                    </Fieldset>
                    {/*<Fieldset legend={(<span style={{fontSize: "20px", fontWeight: "bold"}}>Изменение пароля</span>)}>*/}
                    {/*    <Stack gap="xs">*/}
                    {/*        <PasswordInput*/}
                    {/*            size={"sm"}*/}
                    {/*            label="Старый пароль"*/}
                    {/*        />*/}
                    {/*        <PasswordInput*/}
                    {/*            size={"sm"}*/}
                    {/*            label="Новый пароль"*/}
                    {/*        />*/}
                    {/*        <PasswordInput*/}
                    {/*            size={"sm"}*/}
                    {/*            label="Повтор пароля"*/}
                    {/*        />*/}
                    {/*        <Button size="xs" variant="filled" color="dark">*/}
                    {/*            Сохранить изменения*/}
                    {/*        </Button>*/}
                    {/*    </Stack>*/}
                    {/*</Fieldset>*/}
                </SimpleGrid>
            </DefaultLayout>
        </>
    )
}