import { createAction, props } from "@ngrx/store";
import { ItemsActionTypes } from "../actionTypes/items-action.types";
import { ItemModel, ItemModelWithTagsAsObjects } from "src/app/models/item.model";
import { GetItemsRequestModel } from "src/app/models/getItems-request.model";
import { GetItemsResponseModel } from "src/app/models/getItems-response.model";



//GET ITEMS
export const getItemsAction = createAction(
    ItemsActionTypes.GET_ITEMS,
    props<{requestBody: GetItemsRequestModel}>()
)

export const getItemsOkAction = createAction(
    ItemsActionTypes.GET_ITEMS_OK,
    props<{response: GetItemsResponseModel}>()
)

export const getItemsFailAction = createAction(
    ItemsActionTypes.GET_ITEMS_FAIL,
    props<{error: string}>()
)

export const clearItemsAction = createAction(
    ItemsActionTypes.CLEAR_ITEMS
)



//CREATE ITEM
export const createItemAction = createAction(
    ItemsActionTypes.CREATE_ITEM,
    props<{item: ItemModel}>()
)

export const createItemOkAction = createAction(
    ItemsActionTypes.CREATE_ITEM_OK,
    props<{item: ItemModelWithTagsAsObjects}>()
)

export const createItemFailAction = createAction(
    ItemsActionTypes.CREATE_ITEM_FAIL,
    props<{error: string}>()
)

export const setItemsLoadingAction = createAction(
    ItemsActionTypes.SET_ITEMS_LOADING,
    props<{isLoading: boolean}>()
)



//GET CURRENT ITEM
export const getCurrentItemAction = createAction(
    ItemsActionTypes.GET_CURRENT_ITEM,
    props<{id: string}>()
)

export const getCurrentItemOkAction = createAction(
    ItemsActionTypes.GET_CURRENT_ITEM_OK,
    props<{item: ItemModelWithTagsAsObjects}>()
)

export const getCurrentItemFailAction = createAction(
    ItemsActionTypes.GET_CURRENT_ITEM_FAIL,
    props<{error: string}>()
)



//DELETE ITEM
//...