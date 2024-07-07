import React, {useState} from "react";
import LoginLayout from "../../layouts/login-layout";
import {TextInput, Stack, PasswordInput, Container, Title, Space, Button, Text, Input} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {useRegistration} from "../../hooks/auth";
import axios, {AxiosError} from "axios";
import {IAuthToken, IFailedOperation, IRegisterTalent} from "../../types/auth.ts";
import {AUTH_TOKEN_KEY} from "../../api/constants.ts";


const initialRegisterData: IRegisterTalent = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
}


export default function RegisterPage(){
    const navigate = useNavigate();
    const {mutateAsync, isError, error, isPending, isSuccess, data} = useRegistration()
    const [registerData, setRegisterData] = useState<IRegisterTalent>(initialRegisterData);
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
        navigate("/profile");
    }


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
                            value={registerData.firstname}
                            onChange={(event) => setRegisterData({...registerData, firstname: event.currentTarget.value})}
                            size="md"
                            placeholder="имя"
                        />
                        <TextInput
                            value={registerData.lastname}
                            onChange={(event) => setRegisterData({...registerData, lastname: event.currentTarget.value})}
                            size="md"
                            placeholder="фамилия"
                        />
                        <TextInput
                            value={registerData.email}
                            onChange={(event) => setRegisterData({...registerData, email: event.currentTarget.value})}
                            size="md"
                            placeholder="email"
                        />
                        <PasswordInput
                            value={registerData.password}
                            onChange={(event) => setRegisterData({...registerData, password: event.currentTarget.value})}
                            size="md"
                            placeholder="пароль"
                        />
                        {
                            errors.map(err => (
                                <Input.Error key={err}>{err}</Input.Error>
                            ))
                        }
                        <Button size={"md"} color="orange" fullWidth disabled={isPending} onClick={() => mutateAsync(registerData)}>
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