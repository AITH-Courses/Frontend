interface ITimetableLesson{
    start_time: string,
    end_time: string,
    date: string
}

interface ICourseTimetable{
    lessons: Array<ITimetableLesson>
}

interface IWeekRule{
    id: string,
    timetable_id: string,
    type: string,
    start_time: string,
    end_time: string,
    start_period_date: string,
    end_period_date: string,
    weekdays: Array<string>
}
interface ICreateOrUpdateWeekRule{
    start_time: string,
    end_time: string,
    start_period_date: string,
    end_period_date: string,
    weekdays: Array<string>
}

interface IDayRule{
    id: string,
    timetable_id: string,
    type: string,
    start_time: string,
    end_time: string,
    date: string,
}

interface ICreateOrUpdateDayRule{
    start_time: string,
    end_time: string,
    date: string,
}

interface ICreateOrUpdateRule{
    type: string,
    rule: ICreateOrUpdateWeekRule | ICreateOrUpdateDayRule
}

interface IAdminTimetableLesson{
    start_time: string,
    end_time: string,
    date: string,
    warning_messages: Array<string>
}

interface IAdminCourseRunTimetable{
    id: string,
    rules: Array<IWeekRule | IDayRule>,
    lessons: Array<IAdminTimetableLesson>
}

interface ICreatedTimetableRule{
    rule_id: string
}

export {ITimetableLesson, ICourseTimetable, IWeekRule, IDayRule, IAdminCourseRunTimetable, ICreateOrUpdateRule, ICreateOrUpdateDayRule, ICreateOrUpdateWeekRule, ICreatedTimetableRule}