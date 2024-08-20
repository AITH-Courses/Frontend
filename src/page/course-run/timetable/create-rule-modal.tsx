import {Stack, Button, Tabs, MultiSelect, Grid} from "@mantine/core";
import React, {useState} from "react";
import {useCreateTimetableRule} from "../../../hooks/admin/timetable.ts";
import {ICreateOrUpdateDayRule, ICreateOrUpdateWeekRule} from "../../../types/timetable.ts";
import {DateInput, TimeInput} from "@mantine/dates";
import {getISODate} from "../../../utils/date.ts";

interface CreateRuleModalProps {
    courseId: string,
    courseRunId: string,
    timetableId: string,
    closeModal: () => void
}

const CreateRuleModal: React.FC<CreateRuleModalProps> = (props) => {
    const {courseId, courseRunId, timetableId, closeModal} = props;
    const [dayRule, setDayRule] = useState<ICreateOrUpdateDayRule>({start_time: "", end_time: "", date: ""});
    const [weekRule, setWeekRule] = useState<ICreateOrUpdateWeekRule>({start_time: "", end_time: "", start_period_date: "", end_period_date: "", weekdays: []});

    const {mutateAsync, isPending, isSuccess} = useCreateTimetableRule(courseId, courseRunId, timetableId);

    if (isSuccess){
        closeModal()
    }

    const saveDayRule = () => {
        const data = {
            type: "day",
            rule: dayRule
        }
        mutateAsync(data);
    }

    const saveWeekRule = () => {
        const data = {
            type: "week",
            rule: weekRule
        }
        mutateAsync(data);
    }

    return (
        <Tabs defaultValue="day" color="black">
            <Tabs.List>
                <Tabs.Tab value="day">
                    На день
                </Tabs.Tab>
                <Tabs.Tab value="week">
                    На неделю
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="day">
                <Stack px={16} py={16}>
                    <Grid gutter="xs" gap="xs">
                        <Grid.Col span={{xs: 12, lg: 12}}>
                            <DateInput
                                label="Дата занятия"
                                valueFormat="DD-MM-YYYY"
                                value={dayRule.date && new Date(dayRule.date)}
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
                    <Button variant={"filled"} color="black" loading={isPending} onClick={saveDayRule}>
                        Создать
                    </Button>
                </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="week">
                <Stack px={16} py={16}>
                    <Grid gutter="xs" gap="xs">
                        <Grid.Col span={{xs: 12, lg: 6}}>
                            <DateInput
                                w={"100%"}
                                label="Начало периода"
                                valueFormat="DD-MM-YYYY"
                                value={weekRule.start_period_date && new Date(weekRule.start_period_date)}
                                onChange={value => setWeekRule({...weekRule, start_period_date: getISODate(value)})}
                            />
                        </Grid.Col>
                        <Grid.Col span={{xs: 12, lg: 6}}>
                            <DateInput
                                w={"100%"}
                                label="Конец периода"
                                valueFormat="DD-MM-YYYY"
                                value={weekRule.end_period_date && new Date(weekRule.end_period_date)}
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
                        Создать
                    </Button>
                </Stack>
            </Tabs.Panel>
        </Tabs>
    )
}

export {CreateRuleModal};