import {Container, Space, Title, TextInput, Textarea, Button, Flex, MantineColor} from "@mantine/core";
import React from "react";
import {useForm} from "@mantine/form";


const QuestionSection = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            contact: '',
            content: '',
        },
        validate: {
            content: (value) => value.trim().length !== 0 ? null : "Не указан вопрос",
            contact: (value) => value.trim().length !== 0 ? null : "Не указан контакт",
        },
    });

    return (
        <Container size="sm">
            <Title ta="center">
                Задать свой вопрос
            </Title>
            <Space h={"md"}/>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Textarea
                    key={form.key('content')}
                    withAsterisk
                    label="Вопрос"
                    placeholder="Начните печатать свой вопрос здесь..."
                    autosize
                    minRows={2}
                    {...form.getInputProps('content')}
                />
                <Space h={"md"}/>
                <Flex
                    gap="md"
                    justify="flex-start"
                    align="flex-end"
                    direction="row"
                >
                    <TextInput
                        key={form.key('contact')}
                        withAsterisk
                        style={{flexGrow: 1}}
                        label="Контакт для связи"
                        placeholder="Telegram, email, что-то другое"
                        {...form.getInputProps('contact')}
                    />
                    <Button type="submit" color={"black" as MantineColor}>Отправить</Button>
                </Flex>
            </form>
        </Container>
    )
}

export default QuestionSection;