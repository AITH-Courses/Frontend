import React from "react";
import {ActionIcon, Anchor, Menu, Text} from "@mantine/core";
import {IconDots} from "@tabler/icons-react";
import {IGoogleCalendarLink} from "../../types/google-calendar.ts";
import {useDeleteGoogleCalendar} from "../../hooks/admin/gogle-calendar.ts";
import {useClipboard} from "@mantine/hooks";
import "./index.css";

type IGoogleCalendarLinkCardProps = IGoogleCalendarLink & {courseId: string, courseRunId: string}

const GoogleCalendarLinkCard: React.FC<IGoogleCalendarLinkCardProps> = (props) => {
    const {id, name, link, courseId, courseRunId} = props;
    const {mutateAsync} = useDeleteGoogleCalendar(courseId, courseRunId, id);
    const clipboard = useClipboard();

    const button = (
        <div style={{position: "absolute", top: 0, right: 8}}>
            <Menu offset={-12}>
                <Menu.Target>
                    <ActionIcon variant="transparent" size="xl" aria-label="Settings">
                        <IconDots color="black" size="1.5rem"  stroke={1} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={() => clipboard.copy(link)}>
                        Копировать ссылку
                    </Menu.Item>
                    <Menu.Item onClick={() => mutateAsync(undefined)}>
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
)
    return (
        <div className={"google-calendar-link"}>
            {button}
            <Text>
                {
                    name === ""
                    ? "Без названия"
                    : name
                }
            </Text>
            <Anchor fz="sm" href={link} target="_blank">
                <Text ta="left" fw={600} c="blue">
                    Перейти
                </Text>
            </Anchor>
        </div>
    )
}
export default GoogleCalendarLinkCard;