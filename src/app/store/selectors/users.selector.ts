import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { UsersStateModel } from "src/app/models/users-state.model";
import { UserStateModel } from "src/app/models/user-state.model";



export const usersFeatureSelector = (state: StoreModel): UsersStateModel => state.users;



export const usersIsLoadingSelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.isLoading
)

export const usersErrorSelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.error
)

export const usersUsersSelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.users
)

export const lastEvaluatedKeySelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.LastEvaluatedKey
)

export const usersSearchedUsersSelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.searchedUsers
)

export const usersSearchedUsersErrorSelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.searchedUsersError
)

export const searchedUsersLastEvaluatedKeySelector = createSelector(
    usersFeatureSelector,
    (usersState: UsersStateModel) => usersState.searchedUsersLastEvaluatedKey
)