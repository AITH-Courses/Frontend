import axios from "axios";
import {ICreatedTalentAvatar} from "../../types/talent-profile.ts";

const MODE = import.meta.env.VITE_APPLICATION_MODE;
const IMAGE_SERVICE_BASE_URL = import.meta.env.VITE_IMAGE_SERVICE_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: MODE === "dev"? IMAGE_SERVICE_BASE_URL: undefined,
    withCredentials: false,
});

const URL_CREATE_TALENT_AVATAR = "/api/v1/talent/images"

const createTalentAvatar = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post<ICreatedTalentAvatar>(
        URL_CREATE_TALENT_AVATAR,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    ).then(res => res.data);
}
export {createTalentAvatar};