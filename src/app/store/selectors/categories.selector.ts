import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { CategoriesStateModel } from "src/app/models/categories-state.model";



//feature selector:
//first select the state.categories from store using createFeatureSelector and then you'll use it in normal selectors below
export const categoriesFeatureSelector = (state: StoreModel): CategoriesStateModel => state.categories;



//categories selectors:
export const categoriesIsLoadingSelector = createSelector(
    categoriesFeatureSelector,
    (categoriesState: CategoriesStateModel) => categoriesState.isLoading
)

export const categoriesCategoriesSelector = createSelector(
    categoriesFeatureSelector,
    (categoriesState: CategoriesStateModel) => categoriesState.categories
)

export const categoriesErrorSelector = createSelector(
    categoriesFeatureSelector,
    (categoriesState: CategoriesStateModel) => categoriesState.error
)



//currentCategory selector:
export const currentCategorySelector = createSelector(
    categoriesFeatureSelector,
    (categoriesState: CategoriesStateModel) => categoriesState.currentCategory
)

