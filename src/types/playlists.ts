interface IPlaylist {
    id: string,
    name: string,
    type: string,
    link: string
}

interface ICreateUpdatePlaylist {
    name: string,
    type: string,
    link: string
}

export {IPlaylist, ICreateUpdatePlaylist};