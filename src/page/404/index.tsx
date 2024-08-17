import {Title, Text, Button, Container, Group, Stack} from '@mantine/core';
import "./index.css";
import {useNavigate} from "react-router-dom";

export const Page404 = () => {
    const navigate = useNavigate()

    return (
        <Container className="layout-404">
            <Stack>
                <p className="layout-404__status">404</p>
                <Title ta="center">Кажется, тут ничего нет ...</Title>
                <Text c="dimmed" size="lg" ta="center" >
                    Страница, которую вы пытаетесь открыть, не существует.
                </Text>
                <Group justify="center">
                    <Button variant="filled" size="md" color="dark" onClick={() => navigate("/")}>
                        Вернуться на главную
                    </Button>
                </Group>
            </Stack>
        </Container>
    );
}