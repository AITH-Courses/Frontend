import {useMutation, useQuery} from "@tanstack/react-query";
import {getCurrentUser, loginUser, logoutUser, registerTalent} from "../../api/auth";
import {ILoginUser, IRegisterTalent} from "../../types/auth.ts";

const useMe = () => {
    return useQuery(
        {
            queryKey: ["me"],
            queryFn: () => getCurrentUser(),
        }
    )
};

const useRegistration = () => {
    return useMutation(
        {
            mutationKey: ["register talent"],
            mutationFn: (data: IRegisterTalent) => registerTalent(data),
        }
    )
};

const useLogin = () => {
    return useMutation(
        {
            mutationKey: ["login"],
            mutationFn: (data: ILoginUser) => loginUser(data),
        }
    )
};

const useLogout = () => {
    return useMutation(
        {
            mutationKey: ["logout"],
            mutationFn: () => logoutUser(),
        }
    )
};

export {useMe, useRegistration, useLogin, useLogout};