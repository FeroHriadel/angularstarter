import { UserStateModel } from "src/app/models/user-state.model";
import { createReducer, on, Action } from "@ngrx/store";
import { createUserAction, createUserOkAction, createUserFailAction, clearUserErrorAction, loginAction, loginOkAction, loginFailAction, getUserByIdAction, getUserByIdOkAction, getUserByIdFailAction, signOutAction } from "../actions/user.actions";


const initialState: UserStateModel = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
};



const userReducer = createReducer(
    initialState,

    //create user
    on(createUserAction, (state): UserStateModel => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(createUserOkAction, (state, action): UserStateModel => ({
        ...state,
        isLoading: false,
        error: null,
        user: action.user
    })),

    on(createUserFailAction, (state, action): UserStateModel => ({
        ...state,
        isLoading: false,
        error: action.error,
        user: null
    })),



    //clear error
    on(clearUserErrorAction, (state): UserStateModel => ({
        ...state,
        error: null
    })),



    //login
    on(loginAction, (state): UserStateModel => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(loginOkAction, (state, action): UserStateModel => ({
        ...state,
        isLoading: false,
        error: null,
        user: action.response.user,
        isLoggedIn: true
    })),

    on(loginFailAction, (state, action): UserStateModel => ({
        ...state,
        isLoading: false,
        error: action.error
    })),



    //get user by id
    on(getUserByIdAction, (state): UserStateModel => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(getUserByIdOkAction, (state, action): UserStateModel => ({
        ...state,
        user: action.user,
        isLoggedIn: true,
        isLoading: false,
        error: null
    })),

    on(getUserByIdFailAction, (state, action): UserStateModel => ({
        ...state,
        isLoading: false,
        error: action.error
    })),



    //sign out
    on(signOutAction, (state): UserStateModel => ({
        ...state,
        user: null,
        isLoggedIn: false
    }))
)



export function reducers(state: UserStateModel, action: Action) {
    return userReducer(state, action)
}