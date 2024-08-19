import React from "react";
import {ActionIcon, Menu, Modal, Text} from "@mantine/core";
import {IDayRule, IWeekRule} from "../../types/timetable.ts";
import "./index.css";
import {formatTime, getRussianMonthAndNumberByDateString} from "../../utils/date.ts";
import {useDeleteTimetableRule} from "../../hooks/admin/timetable.ts";
import {IconDots} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {UpdateDayRuleModal} from "../../page/course-run/timetable/update-day-rule-modal.tsx";
import {UpdateWeekRuleModal} from "../../page/course-run/timetable/update-week-rule-modal.tsx";


interface TimetableRuleCardProps {
    rule: IWeekRule | IDayRule,
    courseId: string,
    courseRunId: string,
}

const TimetableRuleCard: React.FC<TimetableRuleCardProps> = (props) => {
    const {rule, courseId, courseRunId} = props;
    const [opened, { open, close }] = useDisclosure(false);
    const {mutateAsync} = useDeleteTimetableRule(courseId, courseRunId, rule.timetable_id, rule.id);

    const button = (
        <div style={{position: "absolute", top: 0, right: 8}}>
            <Menu offset={-12}>
                <Menu.Target>
                    <ActionIcon variant="transparent" size="xl" aria-label="Settings">
                        <IconDots color="black" size="1.5rem"  stroke={1} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={open}>
                        Редактировать
                    </Menu.Item>
                    <Menu.Item onClick={() => mutateAsync(undefined)}>
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
)
    return (
        <div className={"rule"}>
            <Modal opened={opened} onClose={close} title="Редактирование существующего правила" centered>
                {
                    rule.type === "day"
                    ? (
                        <UpdateDayRuleModal
                            courseId={courseId}
                            courseRunId={courseRunId}
                            rule={rule as IDayRule}
                            closeModal={close}
                        />
                    ): (
                        <UpdateWeekRuleModal
                            courseId={courseId}
                            courseRunId={courseRunId}
                            rule={rule as IWeekRule}
                            closeModal={close}
                        />
                    )
                }
            </Modal>
            {button}
            {
                rule.type === "day"
                    ? (
                        <>
                            <Text>
                                Время: {formatTime((rule as IDayRule).start_time)} - {formatTime((rule as IDayRule).end_time)}
                            </Text>
                            <Text>
                                День: {getRussianMonthAndNumberByDateString((rule as IDayRule).date)}
                            </Text>
                        </>
                    ): (
                        <>
                            <Text>
                                Время: {formatTime((rule as IWeekRule).start_time)} - {formatTime((rule as IWeekRule).end_time)}
                            </Text>
                            <Text>
                                Дни повторения: {
                                (rule as IWeekRule).weekdays.length > 0
                                    ? (rule as IWeekRule).weekdays.join(", ")
                                    : "не указаны"
                            }
                            </Text>
                            <Text>
                                Начало периода: {getRussianMonthAndNumberByDateString((rule as IWeekRule).start_period_date)}
                            </Text>
                            <Text>
                                Конец периода: {getRussianMonthAndNumberByDateString((rule as IWeekRule).end_period_date)}
                            </Text>
                        </>
                    )
            }
        </div>
    )
}
export default TimetableRuleCard;