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

export {ICourseCard};