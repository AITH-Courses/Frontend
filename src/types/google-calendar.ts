interface IGoogleCalendarLink {
    id: string,
    name: string,
    link: string
}

interface ICreateGoogleCalendarLink {
    name: string,
    link: string
}

export {IGoogleCalendarLink, ICreateGoogleCalendarLink}