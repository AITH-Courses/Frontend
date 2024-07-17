import {TextInput, Stack, Button, MantineColor} from "@mantine/core";
import React, {useState} from "react";
import {useCreateCourse} from "../../hooks/admin/courses.ts";

const CreateCourseModal = () => {
    const [courseName, setCourseName] = useState("");
    const {mutateAsync, isPending} = useCreateCourse()
    return (
        <Stack>
            <TextInput
                label="Название"
                value={courseName}
                onChange={(e) => setCourseName(e.currentTarget.value)}
            />
            <Button variant={"filled"} color={"black" as MantineColor} loading={isPending} onClick={() => mutateAsync(courseName)}>
                Создать
            </Button>
        </Stack>
    )
}

export {CreateCourseModal};