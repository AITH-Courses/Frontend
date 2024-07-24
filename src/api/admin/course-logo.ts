import axios from "axios";

const MODE = import.meta.env.VITE_APPLICATION_MODE;
const IMAGE_SERVICE_BASE_URL = import.meta.env.VITE_IMAGE_SERVICE_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: MODE === "dev"? IMAGE_SERVICE_BASE_URL: undefined,
    withCredentials: true,
});

const URL_CREATE_COURSE_LOGO = "/admin/images"

const createCourseLogo = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post(URL_CREATE_COURSE_LOGO, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data);
}
export {createCourseLogo};