import {Title, Text, Button, Container, Group, Stack} from '@mantine/core';
import "./index.css";
import {useNavigate} from "react-router-dom";

export const Page404 = () => {
    const navigate = useNavigate()

    return (
        <Container className="layout-404">
            <Stack>
                <p className="layout-404__status">404</p>
                <Title ta="center">Что-то пошло не так...</Title>
                <Text c="dimmed" size="lg" ta="center" >
                    Страница, которую вы пытаетесь открыть, не существует.
                    Возможно, вы неправильно ввели адрес или страница была перемещена на другой URL.
                    Если вы считаете, что это ошибка, обратитесь в службу поддержки.
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