import { ItemModel, ItemModelWithTagsAsObjects } from "./item.model";




export interface ItemsStateModel {
    items: ItemModelWithTagsAsObjects[] | null
    isLoading: boolean
    getItemsError: string | null
    LastEvaluatedKey: {[key: string]: any} | null
    createItemError: string | null
    currentItem: ItemModelWithTagsAsObjects | null,
    currentItemError: string | null
}