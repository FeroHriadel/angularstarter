import { CategoriesStateModel } from "./categories-state.model";
import { UserStateModel } from "./user-state.model";
import { TagsStateModel } from "./tags-state.model";
import { UsersStateModel } from "./users-state.model";
import { ItemsStateModel } from "./items-state.model";



export interface StoreModel {
    categories: CategoriesStateModel
    user: UserStateModel
    tags: TagsStateModel
    users: UsersStateModel,
    items: ItemsStateModel
}