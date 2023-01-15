import { UserModel } from "./user.model";

export interface UsersStateModel {
    users: UserModel[]
    isLoading: boolean
    error: string | null
    LastEvaluatedKey?: {id: string, type: string, email: string} | null
    searchedUsers: UserModel[]
    searchedUsersError: string | null
    searchedUsersLastEvaluatedKey: {[key: string]: any}
}