import { CategoryModel } from "./category.model";



export interface CategoriesStateModel {
    isLoading: boolean
    error: string
    categories: CategoryModel[] | null
    currentCategory: CategoryModel | null
}