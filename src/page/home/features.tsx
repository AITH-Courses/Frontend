import {Container, Title, Text, Grid, Card, Space, rem, Flex} from "@mantine/core";
import {  IconSchool, IconBook, IconMessageCheck} from '@tabler/icons-react';
import React from "react";


const features = [
    {
        title: 'Подтвержденные эксперты',
        description:
            'Преподавателями являются ведущие ученые и лидеры индустрии',
        icon: IconSchool,
    },
    {
        title: 'Актуальные знания',
        description:
            'Программы курсов регулярно пересматриваются и дополняются новыми темами',
        icon: IconBook,
    },
    {
        title: 'Обратная связь',
        description:
            'Пожелания и предложения, оставленные студентами, могут повлиять на развитие курса',
        icon: IconMessageCheck,
    },
]

const FeaturesSection = () => {
    return (
        <Container size="md">
            <Title ta="center">
                Наши преимущества
            </Title>
            <Space h={"md"}/>
            <Grid spacing="xl">
                {
                    features.map(feature => (
                        <Grid.Col key={feature.title} span={{sm: 12, md: 4}}>
                            <Card shadow="md" radius="md"  padding="xl" style={{cursor: "pointer", height: "100%"}}>
                                <Flex align={"center"} justify={"center"}>
                                    <feature.icon
                                        style={{ width: rem(50), height: rem(50) }}
                                        stroke={2}
                                    />
                                </Flex>

                                <Text fz="lg" fw={500}  mt="md" ta={"center"}>
                                    {feature.title}
                                </Text>
                                <Text fz="sm" c="dimmed" mt="sm" ta={"center"}>
                                    {feature.description}
                                </Text>
                            </Card>
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Container>
    )

}
export default FeaturesSection;