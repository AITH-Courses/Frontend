interface ITalentProfile {
    user_id: string,
    firstname: string,
    lastname: string,
    image_url: string | null,
    location: string,
    position: string,
    company: string,
    link_ru_resume: string,
    link_eng_resume: string,
    link_tg_personal: string,
    link_linkedin: string,
}

interface IUpdateProfileGeneral {
    firstname: string,
    lastname: string,
    image_url: string | null,
    location: string,
    position: string,
    company: string,
}

interface IUpdateProfileLinks {
    link_ru_resume: string,
    link_eng_resume: string,
    link_tg_personal: string,
    link_linkedin: string,
}

interface IProfileFavoriteCourse {
    id: string,
    course_id: string,
    name: string,
    image_url: string,
    implementer: string,
}

interface IFavoriteStatus {
    is_favorite: boolean,
}

interface ICreateFavorite {
    course_id: string,
}

export {ITalentProfile, IUpdateProfileGeneral, IUpdateProfileLinks, IProfileFavoriteCourse, ICreateFavorite, IFavoriteStatus}