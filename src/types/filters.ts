interface ICourseFilters{
    implementers: Array<string>,
    roles: Array<string>,
    terms: Array<string>,
    formats: Array<string>,
    only_actual: boolean
}

export {ICourseFilters};