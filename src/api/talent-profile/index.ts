import axiosInstance from "../axios.ts";
import {ISuccessOperation} from "../../types/base.ts";
import {
    ICreateFavorite,
    IFavoriteStatus,
    IProfileFavoriteCourse,
    ITalentProfile,
    IUpdateProfileGeneral,
    IUpdateProfileLinks
} from "../../types/talent-profile.ts";

const URL = {
    GET_PROFILE: "/api/v1/talent/profile",
    CREATE_PROFILE: "/api/v1/talent/profile",
    UPDATE_PROFILE_GENERAL: "/api/v1/talent/profile/general",
    UPDATE_PROFILE_LINKS: "/api/v1/talent/profile/links",
    GET_FAVORITES: "/api/v1/talent/profile/favorites",
    ADD_NEW_FAVORITE: "/api/v1/talent/profile/favorites",
    DELETE_FAVORITE: "/api/v1/talent/profile/favorites/favoriteCourseId",
    GET_FAVORITE_STATUS: "/api/v1/courses/courseId/favorite_status"
};

const getProfile = () => {
    return  axiosInstance.get<ITalentProfile>(URL.GET_PROFILE).then(res => res.data);
};

const createProfile = () => {
    return  axiosInstance.post<ISuccessOperation>(URL.CREATE_PROFILE, {}).then(res => res.data);
};

const updateProfileGeneral = (data: IUpdateProfileGeneral) => {
    return  axiosInstance.put<ISuccessOperation>(URL.UPDATE_PROFILE_GENERAL, data).then(res => res.data);
};

const updateProfileLinks = (data: IUpdateProfileLinks) => {
    return  axiosInstance.put<ISuccessOperation>(URL.UPDATE_PROFILE_LINKS, data).then(res => res.data);
};

const getFavoriteCourses = () => {
    return  axiosInstance.get<Array<IProfileFavoriteCourse>>(URL.GET_FAVORITES).then(res => res.data);
};

const addNewFavorite = (data: ICreateFavorite) => {
    return  axiosInstance.post<ISuccessOperation>(URL.ADD_NEW_FAVORITE, data).then(res => res.data);
};

const deleteFavorite = (favoriteCourseId: string) => {
    return  axiosInstance.delete<ISuccessOperation>(
        URL.DELETE_FAVORITE.replace("favoriteCourseId", favoriteCourseId)
    ).then(res => res.data);
};

const getFavoriteStatus = (courseId: string) => {
    return  axiosInstance.get<IFavoriteStatus>(
        URL.GET_FAVORITE_STATUS.replace("courseId", courseId)
    ).then(res => res.data);
};



export {getProfile, createProfile, updateProfileGeneral, updateProfileLinks, getFavoriteStatus, getFavoriteCourses, addNewFavorite, deleteFavorite}