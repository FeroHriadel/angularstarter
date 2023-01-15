import { UserModel } from "./user.model"
import { UsersLastEvaluatedKeyModel } from "./users-LastEvaluatedKey.model"

export interface GetUsersResponseModel {
    result: {
        Items: UserModel[],
        LastEvaluatedKey?: UsersLastEvaluatedKeyModel
    }
}