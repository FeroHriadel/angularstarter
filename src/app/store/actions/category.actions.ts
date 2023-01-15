import { createAction, props } from "@ngrx/store";
import { CategoryActionTypes } from "../actionTypes/category-action.types";
import { CategoryModel } from "src/app/models/category.model";



//ALL CATEGORIES
export const getCategoriesAction = createAction(
    CategoryActionTypes.GET_CATEGORIES,
)

export const getCategoriesOkAction = createAction(
    CategoryActionTypes.GET_CATEGORIES_OK,
    props<{categories: CategoryModel[]}>()
)

export const getCategoriesFailAction = createAction(
    CategoryActionTypes.GET_CATEGORIES_FAIL,
    props<{error: string}>()
)



//CATEGORY BY ID
export const getCategoryAction = createAction(
    CategoryActionTypes.GET_CATEGORY,
    props<{id: string}>()
)

export const getCategoryOkAction = createAction(
    CategoryActionTypes.GET_CATEGORY_OK,
    props<{category: CategoryModel}>()
)

export const getCategoryFailAction = createAction(
    CategoryActionTypes.GET_CATEGORY_FAIL,
    props<{error: string}>()
)



//UPDATE CATEGORY
export const updateCategoryAction = createAction(
    CategoryActionTypes.UPDATE_CATEGORY,
    props<{category: CategoryModel}>()
)

export const updateCategoryOkAction = createAction(
    CategoryActionTypes.UPDATE_CATEGORY_OK,
    props<{category: CategoryModel}>()
)

export const updateCategoryFailAction = createAction(
    CategoryActionTypes.UPDATE_CATEGORY_FAIL,
    props<{error: string}>()
)



//CLEAR ERROR
export const clearCategoriesError = createAction(
    CategoryActionTypes.CLEAR_CATEGORIES_ERROR
)



//DELETE CATEGORY
export const deleteCategoryAction = createAction(
    CategoryActionTypes.DELETE_CATEGORY,
    props<{id: string}>()
)

export const deleteCategoryOkAction = createAction(
    CategoryActionTypes.DELETE_CATEGORY_OK,
    props<{message: string, ok: Boolean, id: string}>()
)

export const deleteCategoryFailAction = createAction(
    CategoryActionTypes.DELETE_CATEGORY_FAIL,
    props<{error: string}>()
)



//CREATE CATEGORY
export const createCategoryAction = createAction(
    CategoryActionTypes.CREATE_CATEGORY,
    props<{category: CategoryModel}>()
)

export const createCategoryOkAction = createAction(
    CategoryActionTypes.CREATE_CATEGORY_OK,
    props<{category: CategoryModel}>()
)

export const createCategoryFailAction = createAction(
    CategoryActionTypes.CREATE_CATEGORY_FAIL,
    props<{error: string}>()
)



//CLEAR CURRENT CATEGORY
export const clearCurrentCategoryAction = createAction(
    CategoryActionTypes.CLEAR_CURRENT_CATEGORY
)