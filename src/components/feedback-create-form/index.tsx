import {useForm} from "@mantine/form";
import {Button, Flex, MantineColor, Space, Textarea} from "@mantine/core";
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
        },
        validate: {
            text: (value) => value.trim().length !== 0 ? null : "Пустой отзыв",
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

    const createFeedback = (text: string) => {
        createMutate(text).then(
            () => form.reset(),
            null
        )
    }

    return (
        <form onSubmit={form.onSubmit((values) => createFeedback(values.text))}>
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
                justify="flex-end"
                align="flex-end"
                direction="row"
            >
                <Button type="submit" size="xs" color={"black" as MantineColor}>Отправить</Button>
            </Flex>
        </form>
    )
}
export default FeedbackCreateForm;