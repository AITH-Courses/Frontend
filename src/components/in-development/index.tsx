import {Stack, Text, Title} from "@mantine/core";

const InDevelopment = () => {
    return (
        <Stack>
            <Title order={2} ta="left">Страница в разработке...</Title>
            <Text c="dimmed" size="lg" ta="left" >
                Возможно в следующих обновлениях она станет доступной
            </Text>
        </Stack>
    )
}
export default InDevelopment;