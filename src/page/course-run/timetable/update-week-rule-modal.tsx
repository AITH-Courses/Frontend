import {Stack, Button, MultiSelect, Grid} from "@mantine/core";
import React, {useState} from "react";
import {useUpdateTimetableRule} from "../../../hooks/admin/timetable.ts";
import {ICreateOrUpdateWeekRule, IWeekRule} from "../../../types/timetable.ts";
import {DateInput, TimeInput} from "@mantine/dates";
import {getISODate} from "../../../utils/date.ts";

interface UpdateWeekRuleModalProps {
    courseId: string,
    courseRunId: string,
    rule: IWeekRule,
    closeModal: () => void
}

const UpdateWeekRuleModal: React.FC<UpdateWeekRuleModalProps> = (props) => {
    const {courseId, courseRunId, rule, closeModal} = props;
    const [weekRule, setWeekRule] = useState<ICreateOrUpdateWeekRule>({start_time: rule.start_time, end_time: rule.end_time, start_period_date: rule.start_period_date, end_period_date: rule.end_period_date, weekdays: rule.weekdays});

    const {mutateAsync, isPending, isSuccess} = useUpdateTimetableRule(courseId, courseRunId, rule.timetable_id, rule.id);

    if (isSuccess){
        closeModal()
    }

    const saveWeekRule = () => {
        const data = {
            type: "week",
            rule: weekRule
        }
        console.log(data);
        mutateAsync(data);
    }

    return (
        <Stack px={16} py={16}>
            <Grid gutter="xs" gap="xs">
                <Grid.Col span={{xs: 12, lg: 6}}>
                    <DateInput
                        w={"100%"}
                        label="Начало периода"
                        valueFormat="YYYY-MM-DD"
                        value={new Date(weekRule.start_period_date)}
                        onChange={value => setWeekRule({...weekRule, start_period_date: getISODate(value)})}
                    />
                </Grid.Col>
                <Grid.Col span={{xs: 12, lg: 6}}>
                    <DateInput
                        w={"100%"}
                        label="Конец периода"
                        valueFormat="YYYY-MM-DD"
                        value={new Date(weekRule.end_period_date)}
                        onChange={value => setWeekRule({...weekRule, end_period_date: getISODate(value)})}
                    />
                </Grid.Col>
                <Grid.Col span={{xs: 12, lg: 12}}>
                    <MultiSelect
                        width={"100%"}
                        label="Дни повторения"
                        data={["пн", "вт", "ср", "чт", "пт", "сб", "вс"]}
                        value={weekRule.weekdays}
                        onChange={value => setWeekRule({...weekRule, weekdays: value})}
                    />
                </Grid.Col>
                <Grid.Col span={{xs: 12, lg: 6}}>
                    <TimeInput
                        label="Начало занятия"
                        value={weekRule.start_time}
                        onChange={(event) => setWeekRule({...weekRule, start_time: event.currentTarget.value})}
                    />
                </Grid.Col>
                <Grid.Col span={{xs: 12, lg: 6}}>
                    <TimeInput
                        label="Конец занятия"
                        value={weekRule.end_time}
                        onChange={(event) => setWeekRule({...weekRule, end_time: event.currentTarget.value})}
                    />
                </Grid.Col>
            </Grid>
            <Button variant={"filled"} color="black" loading={isPending} onClick={saveWeekRule}>
                Сохранить
            </Button>
        </Stack>
    )
}

export {UpdateWeekRuleModal};