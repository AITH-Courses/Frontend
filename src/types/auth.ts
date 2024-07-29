interface IRegisterTalent{
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

interface IAuthToken{
    auth_token: string
}

interface ILoginUser{
    email: string,
    password: string,
}

interface IUser{
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
}

export {IRegisterTalent, IAuthToken, ILoginUser, IUser};