import axiosInstance from "../axios.ts";
import {IAuthToken, ILoginUser, IRegisterTalent, ISuccessOperation, IUser} from "../../types/auth.ts";


const URL = {
    REGISTER_TALENT: "/auth/register",
    LOGIN_USER: "/auth/login",
    LOGOUT_USER: "/auth/logout",
    CURRENT_USER: "/auth/me",
};

const registerTalent = async (data: IRegisterTalent) => {
    return  await axiosInstance.post<IAuthToken>(URL.REGISTER_TALENT, data);
};

const loginUser = async (data: ILoginUser) => {
    return  await axiosInstance.post<IAuthToken>(URL.LOGIN_USER, data);
};

const logoutUser = async () => {
    return  await axiosInstance.post<ISuccessOperation>(URL.LOGOUT_USER);
};

const getCurrentUser = async () => {
    return  await axiosInstance.post<IUser>(URL.CURRENT_USER);
};

export {registerTalent, loginUser, logoutUser, getCurrentUser}