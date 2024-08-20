interface ICourseRun{
    id: string,
    course_id: string,
    name: string
}

interface ICreateCourseRun{
    season: string,
    year: number
}

interface ICreatedCourseRun{
    course_run_id: string
}

export {ICourseRun, ICreateCourseRun, ICreatedCourseRun}