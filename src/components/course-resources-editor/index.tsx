import React, {useEffect, useState} from "react";
import {ActionIcon, Divider, Grid, Stack, TextInput} from "@mantine/core";
import {IResource} from "../../types/courses.ts";
import {IconPlus, IconX} from "@tabler/icons-react";

interface CourseResourcesEditorProps {
    resources: Array<IResource>
    updateResources: (resources: Array<IResource>) => void
}

const CourseResourcesEditor: React.FC<CourseResourcesEditorProps> = (props) => {
    const [resources, setResources] = useState<Array<IResource>>(props.resources);
    const [newResource, setNewResource] = useState<IResource>({title: "", link: ""})

    useEffect(() => {
        props.updateResources(resources);
    }, [resources]);
    const addResource = () => {
        setResources([...resources, newResource]);
        setNewResource({title: "", link: ""});
    }

    const removeResource = (index: number) => {
        setResources([...resources.slice(0, index), ...resources.slice(index+1)]);
    }

    const updateResource = (index: number, title: string, link: string) => {
        setResources([
            ...resources.slice(0, index),
            {title: title, link: link},
            ...resources.slice(index+1)
        ])
    }

    return (
        <div>
            <Stack
                align="stretch"
                justify="center"
                gap="xs"
            >
                <Grid gutter="xs" align="flex-end">
                    <Grid.Col span={{ base: 10, xs: 10, sm: 10, md: 5, lg: 4 }}>
                        <TextInput
                            size="sm"
                            withAsterisk
                            label="Название"
                            value={newResource.title}
                            onChange={(event) => setNewResource({...newResource, title: event.currentTarget.value})}
                        />
                    </Grid.Col>
                    <Grid.Col hiddenFrom={"md"} span={{ base: 2, xs: 2, sm: 1, md: 1 }}>
                        <ActionIcon color="blue" variant="default" size="lg" aria-label="Add resource" onClick={addResource}>
                            <IconPlus stroke={1.5} />
                        </ActionIcon>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 11, sm: 11, md: 5, lg: 4 }}>
                        <TextInput
                            size="sm"
                            label="Ссылка"
                            value={newResource.link}
                            onChange={(event) => setNewResource({...newResource, link: event.currentTarget.value})}
                        />
                    </Grid.Col>
                    <Grid.Col visibleFrom={"md"} span={{ md: 2, lg: 1 }}>
                        <ActionIcon color="blue" variant="default" size="lg" aria-label="Add resource" onClick={addResource}>
                            <IconPlus stroke={1.5} />
                        </ActionIcon>
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, md: 12, lg: 9 }}>
                        <Divider/>
                    </Grid.Col>
                </Grid>
                {
                    resources.map((resource, index) => (
                        <Grid gutter="xs" align="flex-end">
                            <Grid.Col span={{ base: 10, xs: 10, sm: 10, md: 5, lg: 4 }}>
                                <TextInput
                                    size="sm"
                                    label="Название"
                                    value={resource.title}
                                    onChange={(event) => updateResource(index, event.currentTarget.value, resources[index].link)}
                                />
                            </Grid.Col>
                            <Grid.Col hiddenFrom={"md"} span={{ base: 2, xs: 2, sm: 1, md: 1 }}>
                                <ActionIcon color="red" variant="default" size="lg" aria-label="Remove resource" onClick={() => removeResource(index)}>
                                    <IconX stroke={1.5} />
                                </ActionIcon>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 11, sm: 11, md: 5, lg: 4 }}>
                                <TextInput
                                    size="sm"
                                    label="Ссылка"
                                    value={resource.link}
                                    onChange={(event) => updateResource(index, resources[index].title, event.currentTarget.value)}
                                />
                            </Grid.Col>
                            <Grid.Col visibleFrom={"md"} span={{ md: 2, lg: 1 }}>
                                <ActionIcon color="red" variant="default" size="lg" aria-label="Remove resource" onClick={() => removeResource(index)}>
                                    <IconX stroke={1.5} />
                                </ActionIcon>
                            </Grid.Col>
                        </Grid>
                    ))
                }
            </Stack>
        </div>
    )
}
export default CourseResourcesEditor;