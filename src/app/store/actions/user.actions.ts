import { createAction, props } from "@ngrx/store";
import { UserActionTypes } from "../actionTypes/user-action.types";
import { UserModel } from "src/app/models/user.model";
import { LoginResponseModel } from "src/app/models/login-response.model";



//CREATE USER
export const createUserAction = createAction(
    UserActionTypes.CREATE_USER,
    props<{user: UserModel}>()
)

export const createUserOkAction = createAction(
    UserActionTypes.CREATE_USER_OK,
    props<{user: UserModel}>()
)

export const createUserFailAction = createAction(
    UserActionTypes.CREATE_USER_FAIL,
    props<{error: string}>()
)



//CLEAR ERROR
export const clearUserErrorAction = createAction(
    UserActionTypes.CLEAR_USER_ERROR
)



//LOGIN
export const loginAction = createAction(
    UserActionTypes.LOGIN,
    props<{user: UserModel}>()
)

export const loginOkAction = createAction(
    UserActionTypes.LOGIN_OK,
    props<{response: LoginResponseModel}>()
)

export const loginFailAction = createAction(
    UserActionTypes.LOGIN_FAIL,
    props<{error: string}>()
)



//GET USER BY ID
export const getUserByIdAction = createAction(
    UserActionTypes.GET_USER_BY_ID,
    props<{id: string}>()
)

export const getUserByIdOkAction = createAction(
    UserActionTypes.GET_USER_BY_ID_OK,
    props<{user: UserModel}>()
)

export const getUserByIdFailAction = createAction(
    UserActionTypes.GET_USER_BY_ID_FAIL,
    props<{error: string}>()
)



//SIGN OUT
export const signOutAction = createAction(
    UserActionTypes.SIGN_OUT
)