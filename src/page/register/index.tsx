import React, {useState} from "react";
import LoginLayout from "../../template/login-layout";
import {TextInput, Stack, PasswordInput, Container, Title, Space, Button, Text} from "@mantine/core";
import { Link } from "react-router-dom";

interface RegisterData  {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
}

const initialRegisterData: RegisterData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
}


export default function RegisterPage(){
    const [data, setData] = useState<RegisterData>(initialRegisterData);

    return (
        <>
            <LoginLayout>
                <Container style={{ width: '60%' }}>
                    <Stack>
                        <Title style={{textAlign: "center"}} order={2}>
                            Присоединяйся
                        </Title>
                        <Space h="xs" />
                        <TextInput
                            value={data.firstName}
                            onChange={(event) => setData({...data, firstName: event.currentTarget.value})}
                            size="md"
                            placeholder="имя"
                        />
                        <TextInput
                            value={data.lastName}
                            onChange={(event) => setData({...data, lastName: event.currentTarget.value})}
                            size="md"
                            placeholder="фамилия"
                        />
                        <TextInput
                            value={data.email}
                            onChange={(event) => setData({...data, email: event.currentTarget.value})}
                            size="md"
                            placeholder="email"
                        />
                        <PasswordInput
                            value={data.password}
                            onChange={(event) => setData({...data, password: event.currentTarget.value})}
                            size="md"
                            placeholder="пароль"
                        />
                        <PasswordInput
                            value={data.password2}
                            onChange={(event) => setData({...data, password2: event.currentTarget.value})}
                            size="md"
                            placeholder="повтор пароля"
                        />
                        <Button size={"md"} color="orange" fullWidth>
                            Создать аккаунт
                        </Button>
                        <Link to={"/login"}>
                            <Text style={{textAlign: "center"}} size="lg">
                                Перейти ко входу в аккаунт
                            </Text>
                        </Link>
                    </Stack>
                </Container>
            </LoginLayout>
        </>
    )
}