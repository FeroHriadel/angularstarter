import { createReducer, on, Action } from "@ngrx/store";
import { UsersStateModel } from "src/app/models/users-state.model";
import { getUsersAction, getUsersOkAction, getUsersFailAction, clearGetUsersError, clearAllUsers, getSearchedUsersAction, getSearchedUsersOkAction, getSearchedUsersFailAction, clearSearchedUsersError, clearAllSearchedUsers } from "../actions/users.actions";



const initialState: UsersStateModel = {
    isLoading: false,
    users: null,
    error: null,
    LastEvaluatedKey: null,
    searchedUsers: null,
    searchedUsersError: null,
    searchedUsersLastEvaluatedKey: null
};



const usersReducer = createReducer( 
    initialState,

    on(getUsersAction, (state): UsersStateModel => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(getUsersOkAction, (state, action): UsersStateModel => ({
        ...state,
        isLoading: false,
        error: null,
        users: state.users ? [...state.users, ...action.result.result.Items] : action.result.result.Items,
        LastEvaluatedKey: action.result.result.LastEvaluatedKey
    })),

    on(getUsersFailAction, (state, action): UsersStateModel => ({
        ...state,
        error: action.error ? action.error : 'Something went wrong',
        isLoading: false,
    })),

    on(clearGetUsersError, (state): UsersStateModel => ({
        ...state,
        error: null
    })),

    on(clearAllUsers, (state): UsersStateModel => ({
        ...state,
        error: null,
        isLoading: false,
        LastEvaluatedKey: null,
        users: null
    })),

    on(getSearchedUsersAction, (state): UsersStateModel => ({
        ...state,
        isLoading: true,
        searchedUsersError: null,
    })),

    on(getSearchedUsersOkAction, (state, action): UsersStateModel => ({
        ...state,
        isLoading: false,
        searchedUsers: action.result.result.Items,
        searchedUsersLastEvaluatedKey: action.result.result.LastEvaluatedKey
    })),

    on(getSearchedUsersFailAction, (state, action): UsersStateModel => ({
        ...state,
        isLoading: false,
        searchedUsersError: action.error ? action.error : 'Something went wrong',
    })),

    on(clearSearchedUsersError, (state): UsersStateModel => ({
        ...state,
        searchedUsersError: null
    })),

    on(clearAllSearchedUsers, (state): UsersStateModel => ({
        ...state,
        searchedUsers: null,
        searchedUsersLastEvaluatedKey: null
    }))

);



export function reducers(state: UsersStateModel, action: Action) {
    return usersReducer(state, action)
}