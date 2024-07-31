import {useForm} from "@mantine/form";
import {Button, Flex, MantineColor, Space, Textarea, Rating, Text} from "@mantine/core";
import React, {useEffect} from "react";
import {useCreateFeedback} from "../../hooks/feedback";

interface FeedbackCreateFormProps {
    courseId: string
}

const FeedbackCreateForm: React.FC<FeedbackCreateFormProps> = (props) => {
    const {mutateAsync: createMutate} = useCreateFeedback(props.courseId)
    const persistentKey = "feedback_" + props.courseId;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            text: "",
            rating: 0
        },
        validate: {
            text: (value) => value.trim().length !== 0 ? null : "Пустой отзыв",
            rating: (value) => +value !== 0 ? null : "Минимальная оценка: 1 звезда",
        },
        onValuesChange: (values) => {
            window.localStorage.setItem(persistentKey, JSON.stringify(values));
        },
    });

    useEffect(() => {
        const storedValues = window.localStorage.getItem(persistentKey);
        if (storedValues) {
            try {
                form.setValues(JSON.parse(storedValues));
            } catch (e) {
                console.log('Failed to parse stored values for feedback creating form');
            }
        }
    }, []);

    const createFeedback = (text: string, rating: number) => {
        createMutate({text: text, rating: rating}).then(
            () => form.reset(),
            null
        )
    }

    return (
        <form onSubmit={form.onSubmit((values) => createFeedback(values.text, values.rating))}>
            <Rating
                key={form.key('rating')}
                defaultValue={0}
                count={5}
                size="lg"
                {...form.getInputProps('rating')}
            />
            {
                form.errors["rating"] === undefined
                ? null
                : (
                    <Text c="red" size={"xs"} mt={8}>
                        {form.errors["rating"]}
                    </Text>
                )
            }
            <Space h={8}/>
            <Textarea
                key={form.key('text')}
                withAsterisk
                placeholder="Начните печатать свой отзыв здесь..."
                autosize
                minRows={3}
                {...form.getInputProps('text')}
            />
            <Space h={8}/>
            <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
            >
                <Button type="submit" size="xs" color={"black" as MantineColor}>Отправить</Button>
            </Flex>

        </form>
    )
}
export default FeedbackCreateForm;