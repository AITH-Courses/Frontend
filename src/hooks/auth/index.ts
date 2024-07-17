import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCurrentUser, loginUser, logoutUser, registerTalent} from "../../api/auth";
import {ILoginUser, IRegisterTalent} from "../../types/auth.ts";

const useMe = () => {
    return useQuery(
        {
            queryKey: ["me"],
            queryFn: () => getCurrentUser(),
            staleTime: 5 * 60 * 1000
        }
    )
};

const useRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["register_talent"],
            mutationFn: (data: IRegisterTalent) => registerTalent(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["me"] });
            }
        }
    )
};

const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["login"],
            mutationFn: (data: ILoginUser) => loginUser(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["me"] });
            }
        }
    )
};

const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationKey: ["logout"],
            mutationFn: () => logoutUser(),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["me"] });
            }
        }
    )
};

export {useMe, useRegistration, useLogin, useLogout};