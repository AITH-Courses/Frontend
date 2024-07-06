import axiosInstance from "../axios.ts";
import {IAuthToken, ILoginUser, IRegisterTalent, ISuccessOperation, IUser} from "../../types/auth.ts";


const URL = {
    REGISTER_TALENT: "/auth/register",
    LOGIN_USER: "/auth/login",
    LOGOUT_USER: "/auth/logout",
    CURRENT_USER: "/auth/me",
};

const registerTalent = (data: IRegisterTalent) => {
    return  axiosInstance.post<IAuthToken>(URL.REGISTER_TALENT, data).then(res => res.data);
};

const loginUser = (data: ILoginUser) => {
    return axiosInstance.post<IAuthToken>(URL.LOGIN_USER, data).then(res => res.data);
};

const logoutUser = () => {
    return axiosInstance.post<ISuccessOperation>(URL.LOGOUT_USER).then(res => res.data);
};

const getCurrentUser = async () => {
    return axiosInstance.get<IUser>(URL.CURRENT_USER).then(res => res.data);
};

export {registerTalent, loginUser, logoutUser, getCurrentUser}