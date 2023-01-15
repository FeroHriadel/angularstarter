import { UserModel } from "./user.model"

export interface LoginResponseModel {
    user: UserModel
    token: string
}