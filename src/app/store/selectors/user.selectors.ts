import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { UserStateModel } from "src/app/models/user-state.model";



export const userFeatureSelector = (state: StoreModel): UserStateModel => state.user;



export const userIsLoadingSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateModel) => userState.isLoading
)

export const userErrorSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateModel) => userState.error
)

export const userUserSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateModel) => userState.user
)

export const userIsLoggedInSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateModel) => userState.isLoggedIn
)