import React from "react";
import {Container, Title, Button, Space, Text, Flex} from "@mantine/core";
import {useNavigate} from "react-router-dom";

const WelcomeSection = () => {
    const navigate = useNavigate();
    return (
        <Container size="sm">
            <Title ta={"center"}>
                Добро пожаловать в <br/> <span style={{color: "var(--orange)"}}> AI Talent Hub Courses</span>
            </Title>
            <Space h={"md"}/>
            <Text c="dimmed" ta={"center"}>
                Это community-driven платформа,<br/> посвященная курсам в AI Talent Hub
            </Text>
            <Space h={"md"}/>
            <Flex align={"center"} justify={"center"}>
                <Button size="sm" variant="outline" color="black" onClick={() => navigate("/courses")}>Перейти к курсам</Button>
            </Flex>
        </Container>
    )
}
export default WelcomeSection;