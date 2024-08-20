import React, {useState} from "react";
import LoginLayout from "../../layouts/login-layout";
import {Input, TextInput, Stack, PasswordInput, Container, Title, Space, Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../hooks/auth";
import axios, {AxiosError} from "axios";
import {IAuthToken, ILoginUser} from "../../types/auth.ts";
import {AUTH_TOKEN_KEY} from "../../api/constants.ts";
import {IFailedOperation} from "../../types/base.ts";


const initialLoginData: ILoginUser = {
    email: "",
    password: ""
}


export default function AdminLoginPage(){
    const navigate = useNavigate();
    const {mutateAsync, isError, error, isPending, isSuccess, data} = useLogin()
    const [loginData, setLoginData] = useState<ILoginUser>(initialLoginData);
    const errors = [];
    if (isError && axios.isAxiosError(error)){
        const e = error as AxiosError<IFailedOperation, never>;
        try{
            const errorMessage = e.response.data.message;
            errors.push(errorMessage);
        } catch {
            console.error(e);
        }
    }
    if (isSuccess){
        localStorage.setItem(AUTH_TOKEN_KEY, (data as IAuthToken).auth_token);
        navigate("/admin/courses");
    }

    return (
        <>
            <LoginLayout>
                <Container style={{ width: '60%' }}>
                    <Stack>
                        <Title style={{textAlign: "center"}} order={2}>Вход для организаторов</Title>
                        <Space h="xs" />
                        <TextInput
                            value={loginData.email}
                            onChange={(event) => setLoginData({...loginData, email: event.currentTarget.value})}
                            size="md"
                            placeholder="email"
                        />
                        <PasswordInput
                            value={loginData.password}
                            onChange={(event) => setLoginData({...loginData, password: event.currentTarget.value})}
                            size="md"
                            placeholder="пароль"
                        />
                        {
                            errors.map(err => (
                                <Input.Error key={err}>{err}</Input.Error>
                            ))
                        }
                        <Button size={"md"} color="orange" fullWidth disabled={isPending} onClick={() => mutateAsync(loginData)}>
                            Войти
                        </Button>
                    </Stack>
                </Container>
            </LoginLayout>
        </>
    )
}