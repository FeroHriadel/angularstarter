import { createAction, props } from "@ngrx/store";
import { UsersActiontypes } from "../actionTypes/users-action.types";
import { GetUsersResponseModel } from "src/app/models/getUsers-response.model";
import { UsersLastEvaluatedKeyModel } from "src/app/models/users-LastEvaluatedKey.model";



//GET USERS
export const getUsersAction = createAction(
    UsersActiontypes.GET_USERS,
    props<{lastEvaluatedKey: UsersLastEvaluatedKeyModel | null}>()
)

export const getUsersOkAction = createAction(
    UsersActiontypes.GET_USERS_OK,
    props<{result: GetUsersResponseModel}>()
)

export const getUsersFailAction = createAction(
    UsersActiontypes.GET_USERS_FAIL,
    props<{error: string}>()
)

export const clearGetUsersError = createAction(
    UsersActiontypes.CLEAR_GET_USERS_ERROR
)

export const clearAllUsers = createAction(
    UsersActiontypes.CLEAR_ALL_USERS
)

export const getSearchedUsersAction = createAction(
    UsersActiontypes.GET_SEARCHED_USERS,
    props<{emailSearch: string, lastEvaluatedKey: {[key: string]: any} | null}>()
)

export const getSearchedUsersOkAction = createAction(
    UsersActiontypes.GET_SEARCHED_USERS_OK,
    props<{result: GetUsersResponseModel}>()
)

export const getSearchedUsersFailAction = createAction(
    UsersActiontypes.GET_SEARCHED_USERS_FAIL,
    props<{error: string}>()
)

export const clearSearchedUsersError = createAction(
    UsersActiontypes.CLEAR_GET_SEARCHED_USERS_ERROR
)

export const clearAllSearchedUsers = createAction(
    UsersActiontypes.CLEAR_SEARCHED_USERS
)

