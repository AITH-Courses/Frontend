import axiosInstance from "../axios.ts";
import {IAuthToken, ILoginUser, IRegisterTalent, IUser} from "../../types/auth.ts";
import {ISuccessOperation} from "../../types/base.ts";


const URL = {
    REGISTER_TALENT: "/api/v1/auth/register",
    LOGIN_USER: "/api/v1/auth/login",
    LOGOUT_USER: "/api/v1/auth/logout",
    CURRENT_USER: "/api/v1/auth/me",
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