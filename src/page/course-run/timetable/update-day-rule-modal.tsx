import {Stack, Button, Grid} from "@mantine/core";
import React, {useState} from "react";
import { useUpdateTimetableRule} from "../../../hooks/admin/timetable.ts";
import {
    ICreateOrUpdateDayRule,  IDayRule,
} from "../../../types/timetable.ts";
import {DateInput, TimeInput} from "@mantine/dates";
import {getISODate} from "../../../utils/date.ts";

interface CreateRuleModalProps {
    courseId: string,
    courseRunId: string,
    rule: IDayRule,
    closeModal: () => void
}

const UpdateDayRuleModal: React.FC<CreateRuleModalProps> = (props) => {
    const {courseId, courseRunId, rule, closeModal} = props;
    const [dayRule, setDayRule] = useState<ICreateOrUpdateDayRule>({start_time: rule.start_time, end_time: rule.end_time, date: rule.date});

    const {mutateAsync, isPending, isSuccess} = useUpdateTimetableRule(courseId, courseRunId, rule.timetable_id, rule.id);

    if (isSuccess){
        closeModal()
    }

    const updateDayRule = () => {
        const data = {
            type: "day",
            rule: dayRule
        }
        mutateAsync(data);
    }

    return (
        <Stack px={16} py={16}>
            <Grid gutter="xs" gap="xs">
                <Grid.Col span={{xs: 12, lg: 12}}>
                    <DateInput
                        label="Дата занятия"
                        valueFormat="YYYY-MM-DD"
                        value={new Date(dayRule.date)}
                        onChange={value => setDayRule({...dayRule, date: getISODate(value)})}
                    />
                </Grid.Col>
                <Grid.Col span={{xs: 12, lg: 6}}>
                    <TimeInput
                        label="Начало занятия"
                        value={dayRule.start_time}
                        onChange={(event) => setDayRule({...dayRule, start_time: event.currentTarget.value})}
                    />
                </Grid.Col>
                <Grid.Col span={{xs: 12, lg: 6}}>
                    <TimeInput
                        label="Конец занятия"
                        value={dayRule.end_time}
                        onChange={(event) => setDayRule({...dayRule, end_time: event.currentTarget.value})}
                    />
                </Grid.Col>
            </Grid>
            <Button variant={"filled"} color="black" loading={isPending} onClick={updateDayRule}>
                Сохранить
            </Button>
        </Stack>

    )
}

export {UpdateDayRuleModal};