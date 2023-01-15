import { UserModel } from "./user.model";

export interface UserStateModel {
    user: UserModel | null
    isLoggedIn: boolean //this needn't have been here I am using user for login check :(
    isLoading: boolean
    error: string | null
}