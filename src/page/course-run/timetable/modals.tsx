import {Stack, Button, MantineColor, NumberInput, Select} from "@mantine/core";
import React, {useState} from "react";
import {ICreateCourseRun} from "../../types/course-runs.ts";
import {useCreateCourseRun} from "../../hooks/course-runs";

interface CreateCourseRunModalProps {
    courseId: string
}

const CreateRuleModal: React.FC<CreateCourseRunModalProps> = (props) => {
    const [courseRunData, setCourseRunData] = useState<ICreateCourseRun>({season: "Весна", year: new Date().getFullYear()});
    const {mutateAsync, isPending} = useCreateCourseRun(props.courseId)
    return (
        <Stack>
            <Select
                label="Семестр запуска"
                data={["Осень", "Весна"]}
                value={courseRunData.season}
                onChange={value => setCourseRunData({...courseRunData, season: value})}
            />
            <NumberInput
                label="Год запуска"
                min={2022}
                max={2030}
                value={courseRunData.year}
                onChange={value => setCourseRunData({...courseRunData, year: value})}
            />
            <Button variant={"filled"} color={"black" as MantineColor} loading={isPending} onClick={() => mutateAsync(courseRunData)}>
                Создать
            </Button>
        </Stack>
    )
}

export {CreateRuleModal};