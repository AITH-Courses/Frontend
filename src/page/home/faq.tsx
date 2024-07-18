import {Accordion, Container, Space, Title} from "@mantine/core";
import React from "react";

const FAQSection = () => {
    return (
        <Container size="sm">
            <Title ta="center">
                Часто задаваемые вопросы
            </Title>
            <Space h={"md"}/>
            <Accordion variant="default">
                <Accordion.Item value="what-to-do">
                    <Accordion.Control>Для чего платформа?</Accordion.Control>
                    <Accordion.Panel>
                        На платформе можно получить информацию о курсах, которые проводятся в AI Talent Hub, оставить свой отзыв, задать вопрос по курсу
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}
export default FAQSection;