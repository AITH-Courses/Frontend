import React, {useState} from "react";
import LoginLayout from "../../template/login-layout";
import {TextInput, Stack, PasswordInput, Container, Title, Space, Button, Text} from "@mantine/core";
import { Link } from "react-router-dom";

interface LoginData  {
    email: string,
    password: string
}

const initialLoginData: LoginData = {
    email: "",
    password: ""
}


export default function LoginPage(){
    const [data, setData] = useState<LoginData>(initialLoginData);

    return (
        <>
            <LoginLayout>
                <Container style={{ width: '60%' }}>
                    <Stack>
                        <Title style={{textAlign: "center"}} order={2}>Добро пожаловать</Title>
                        <Space h="xs" />
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
                        <Button size={"md"} color="orange" fullWidth>
                            Войти
                        </Button>
                        <Link to={"/register"}>
                            <Text style={{textAlign: "center"}} size="lg">
                                Перейти к созданию аккаунта
                            </Text>
                        </Link>
                    </Stack>
                </Container>
            </LoginLayout>
        </>
    )
}