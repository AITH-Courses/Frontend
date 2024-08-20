import {ITimetableLesson} from "../types/timetable.ts";


function generateICS (lessons: Array<ITimetableLesson>, courseName: string): string {
    const timeZone = 'Europe/Moscow';
    let icsString = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI Talent Hub//AITH-Courses//EN\n`;
    lessons.forEach((lesson) => {
        console.log(lesson)
        const summary = courseName;
        icsString += `BEGIN:VEVENT\n`
        icsString += `DTSTART;TZID=${timeZone}:${lesson.date.replace(/-/g, "")}T${lesson.start_time.replace(/:/g, "")}\n`
        icsString += `DTEND;TZID=${timeZone}:${lesson.date.replace(/-/g, "")}T${lesson.end_time.replace(/:/g, "")}\n`
        icsString += `SUMMARY:${summary}\n`
        icsString += `END:VEVENT\n`
        console.log(icsString)
    });

    icsString += `END:VCALENDAR`;
    console.log(icsString)
    return icsString;
}

export {generateICS};