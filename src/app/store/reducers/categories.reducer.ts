import { CategoriesStateModel } from "src/app/models/categories-state.model";
import { createReducer, on, Action } from "@ngrx/store";
import { getCategoriesAction, getCategoriesOkAction, getCategoriesFailAction, getCategoryAction, getCategoryOkAction, getCategoryFailAction, updateCategoryAction, updateCategoryOkAction, updateCategoryFailAction, clearCategoriesError, deleteCategoryAction, deleteCategoryOkAction, deleteCategoryFailAction, createCategoryAction, createCategoryOkAction, createCategoryFailAction, clearCurrentCategoryAction } from "../actions/category.actions";




const initialState: CategoriesStateModel = {
    isLoading: false,
    categories: null,
    error: null,
    currentCategory: null,
};



const categoriesReducer = createReducer( //create reducer
    initialState, //initial state comes here
                  //then you list on(action1), on(action2) and in each you get access to state.categories and action.payload



    //get categories
    on(getCategoriesAction, (state): CategoriesStateModel => ({
        ...state, //you can modify state.categories here
        isLoading: true,
        error: null,
    })),

    on(getCategoriesOkAction, (state, action): CategoriesStateModel => ({
        ...state,
        isLoading: false,
        error: null,
        categories: [...action.categories].sort(function(a, b){ //you have access to action.payload too (here: action.categories)
            if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
            if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
            return 0;
        })
    })),

    on(getCategoriesFailAction, (state, action): CategoriesStateModel => ({
        ...state,
        error: action.error ? action.error : 'Somehing went wrong',
        isLoading: false,
        categories: null,
    })),



    //get category
    on(getCategoryAction, (state): CategoriesStateModel => ({
        ...state,
        error: null,
        isLoading: true
    })),

    on(getCategoryOkAction, (state, action): CategoriesStateModel => ({
        ...state,
        error: null,
        isLoading: false,
        currentCategory: action.category
    })),

    on(getCategoryFailAction, (state, action): CategoriesStateModel => ({
        ...state,
        isLoading: false,
        currentCategory: null,
        error: action.error
    })),



    //update category
    on(updateCategoryAction, (state): CategoriesStateModel => { 
        return ({
            ...state,
            isLoading: true,
            error: null
        })
    }),

    on(updateCategoryOkAction, (state, action): CategoriesStateModel => {
        let newCategoriesArr = null;
        if (state.categories) {
            const updatedCategoryIdx = state.categories.findIndex(c => c.id === action.category.id);
            newCategoriesArr = [...state.categories];
            newCategoriesArr.splice(updatedCategoryIdx, 1, action.category);
        }
        return ({
            ...state,
            categories: newCategoriesArr ? newCategoriesArr : state.categories,
            currentCategory: action.category,
            isLoading: false,
            error: null,
    })}),

    on(updateCategoryFailAction, (state, action): CategoriesStateModel => ({
        ...state,
        isLoading: false,
        error: action.error
    })),



    //clear error
    on(clearCategoriesError, (state): CategoriesStateModel => ({
        ...state,
        error: null
    })),



    //delete category
    on(deleteCategoryAction, (state): CategoriesStateModel => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(deleteCategoryOkAction, (state, action): CategoriesStateModel => {
        let newCategoriesArr = null;
        if (state.categories) {
            const updatedCategoryIdx = state.categories.findIndex(c => c.id === action.id);
            newCategoriesArr = [...state.categories];
            newCategoriesArr.splice(updatedCategoryIdx, 1);
        }

        let isCurrentCategoryBeingDeleted = false;
        if (state.currentCategory && state.currentCategory.id) {
            if (state.currentCategory.id === action.id) isCurrentCategoryBeingDeleted = true; 
        } 

        return {
            ...state,
            isLoading: false,
            error: null,
            categories: newCategoriesArr ? newCategoriesArr : state.categories,
            currentCategory: isCurrentCategoryBeingDeleted ? null : state.currentCategory
        }
    }),

    on(deleteCategoryFailAction, (state, action): CategoriesStateModel => ({
        ...state,
        isLoading: false,
        error: action.error
    })),



    //create category
    on(createCategoryAction, (state): CategoriesStateModel => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(createCategoryOkAction, (state, action): CategoriesStateModel => ({
        ...state,
        isLoading: false,
        error: null,
        categories: state.categories ? [action.category, ...state.categories] : state.categories
    })),

    on(createCategoryFailAction, (state, action): CategoriesStateModel => ({
        ...state,
        isLoading: false,
        error: action.error
    })),



    //clear current category
    on(clearCurrentCategoryAction, (state): CategoriesStateModel => ({
        ...state,
        currentCategory: null
    }))
)



//don't forget to export a function called 'reducers' you'll need it in module that uses the state
export function reducers(state: CategoriesStateModel, action: Action) { //Action comes from ngrx whatever it is
    return categoriesReducer(state, action)
}