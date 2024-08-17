import {Title, Text, Button, Container, Group, Stack} from '@mantine/core';
import "./index.css";
import {useNavigate} from "react-router-dom";

export const Page403 = () => {
    const navigate = useNavigate()

    return (
        <Container className="layout-403">
            <Stack>
                <p className="layout-403__status">403</p>
                <Title ta="center">Упсс, доступ запрещен...</Title>
                <Text c="dimmed" size="lg" ta="center">
                    У вас недостаточно прав для просмотра этой страницы.
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