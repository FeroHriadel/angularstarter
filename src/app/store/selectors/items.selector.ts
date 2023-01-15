import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { ItemsStateModel } from "src/app/models/items-state.model";



export const itemsFeatureSelector = (state: StoreModel): ItemsStateModel => state.items;



export const itemsIsLoadingSelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.isLoading
);

export const itemsItemsSelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.items
);

export const itemsGetItemsErrorSelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.getItemsError
);

export const itemsLastEvaluatedKeySelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.LastEvaluatedKey
);

export const itemsCreateItemErrorSelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.createItemError
);

export const itemsCurrentItemSelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.currentItem
);

export const itemsCurrentItemErrorSelector = createSelector(
    itemsFeatureSelector,
    (itemsState: ItemsStateModel) => itemsState.currentItemError
);