interface ICourseCard{
    id: string,
    name: string,
    image_url: string,
    is_draft: boolean,
    implementer: string,
    roles: Array<string>,
    last_runs: Array<string>,
    format: string,
}

interface ICoursesWithPage{
    courses: Array<ICourseCard>,
    max_page: number,
}

interface ICourseInfo{
    id: string,
    name: string,
    image_url: string,
    limits: number | null,
    is_draft: boolean,

    prerequisites: string | null,
    description: string | null,
    topics: string | null,
    assessment: string | null,
    resources: string | null,
    extra: string | null,

    author: string,
    implementer: string,
    format: string,
    terms: string,
    roles: Array<string>,
    periods: Array<string>,
    last_runs: Array<string>,
}

type IUpdateCourseInfo = Omit<ICourseInfo, "id">;

interface ICreatedCourse{
    course_id: string
}

interface ICreatedCourseLogo{
    URL: string
}

export {ICourseCard, ICoursesWithPage, ICourseInfo, IUpdateCourseInfo, ICreatedCourse, ICreatedCourseLogo};