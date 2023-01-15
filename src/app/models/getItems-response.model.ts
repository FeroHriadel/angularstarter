import { ItemModel, ItemModelWithTagsAsObjects } from "./item.model"

export interface GetItemsResponseModel {
    result?: {
        Items: ItemModelWithTagsAsObjects[]
        LastEvaluatedKey?: {[key: string]: any}
    },
    error?: string
}