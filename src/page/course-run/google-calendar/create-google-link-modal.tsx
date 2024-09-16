import {Stack, Button, TextInput} from "@mantine/core";
import React, {useState} from "react";
import {ICreateGoogleCalendarLink} from "../../../types/google-calendar.ts";
import {useCreateGoogleCalendar} from "../../../hooks/admin/gogle-calendar.ts";

interface CreateRuleModalProps {
    courseId: string,
    courseRunId: string,
    closeModal: () => void
}

const CreateGoogleLinkModal: React.FC<CreateRuleModalProps> = (props) => {
    const {courseId, courseRunId, closeModal} = props;
    const [googleLink, setGoogleLink] = useState<ICreateGoogleCalendarLink>({link: "", name: ""});

    const {mutateAsync, isPending, isSuccess} = useCreateGoogleCalendar(courseId, courseRunId);

    if (isSuccess){
        closeModal()
    }

    return (
        <Stack px={16} py={16} gap={"xs"}>
            <TextInput
                withAsterisk
                label="Ссылка на Google-календарь"
                value={googleLink.link}
                onChange={e => setGoogleLink({...googleLink, link: e.target.value})}
            />
            <TextInput
                label="Название группы"
                value={googleLink.name}
                onChange={e => setGoogleLink({...googleLink, name: e.target.value})}
            />
            <Button variant={"filled"} color="black" loading={isPending} onClick={() => mutateAsync(googleLink)}>
                Создать
            </Button>
        </Stack>
    )
}

export {CreateGoogleLinkModal};