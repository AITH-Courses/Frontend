import {ICourseCard} from "../../types/courses.ts";
import {Badge, Card, Image, Text} from "@mantine/core";
import {SHORT_ROLES_MAP} from "../../constants";
import React from "react";
import {useNavigate} from "react-router-dom";
import "./index.css";

interface CourseCardProps {
    card: ICourseCard
}

const CourseCard :React.FC<CourseCardProps> = (props) => {
    const navigate = useNavigate();

    const {card} = props;
    return (
        <Card shadow="none" padding="sm" radius="md" withBorder={false} style={{cursor: "pointer", height: "100%"}}
              onClick={() => navigate(`/courses/${card.id}`)} title={"Нажмите для перехода к курсу"}
            className={"course-card"}
        >
            <Card.Section>
                <Image
                    radius="lg"
                    src={card.image_url}
                    alt="Re"
                    h={"200px"}
                    fallbackSrc="https://placehold.co/1280x720?text=Нет+логотипа"
                />
            </Card.Section>
            <Badge
                variant="filled"
                color="orange"
                style={{position: "absolute", top: "16px", left: "16px"}}
            >
                {card.implementer}
            </Badge>
            {
                card.roles.map((role, index) => (
                    <Badge
                        key={role}
                        variant="filled"
                        color="orange"
                        style={{position: "absolute", top: (24 * index + 16).toString() + "px", right: "16px", width: "64px"}}
                    >
                        {SHORT_ROLES_MAP[role]}
                    </Badge>
                ))
            }
            <Text fz={"h3"}>{card.name}</Text>
            <Text size="md" c="dimmed">
                {
                    card.last_runs.join(", ")
                }
            </Text>
            <Text size="md" c="dimmed">
                {card.format}
            </Text>
        </Card>
    )
}
export default CourseCard;