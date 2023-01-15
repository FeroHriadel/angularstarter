import { CategoryModel } from "./category.model";
import { TagModel } from "./tag.model";

export interface ItemModel {
    id?: string,
    createdAt?: string,
    name?: string,
    description?: string,
    category: string | CategoryModel,
    tags?: string[] | TagModel[],
    mainImage?: string,
    images?: string[]
}

export interface ItemModelWithTagsAsObjects { //had to remove tags: string[] from ItemModel bc html objected to having `tag.imageUrl`
    id?: string,
    createdAt?: string,
    name?: string,
    description?: string,
    category: CategoryModel, //removed: | string
    tags?: TagModel[], //removed: | string[]
    mainImage?: string,
    images?: string[]
    user?: {[key: string]: any}
}