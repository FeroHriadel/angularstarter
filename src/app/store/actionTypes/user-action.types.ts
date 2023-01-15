export enum UserActionTypes {
    CREATE_USER = '[User] create user',
    CREATE_USER_OK = '[User] create user ok',
    CREATE_USER_FAIL = '[User] create user fail',

    CLEAR_USER_ERROR = '[User] clear user error',

    LOGIN = '[User] login',
    LOGIN_OK = '[User] login ok',
    LOGIN_FAIL = '[User] login_fail',

    GET_USER_BY_ID = '[User] get user by id',
    GET_USER_BY_ID_OK = '[User] get user by id ok',
    GET_USER_BY_ID_FAIL = '[User] get user by id fail',

    SIGN_OUT = '[User] sign out',
}