import { createReducer, on, Action } from "@ngrx/store";
import { ItemsStateModel } from "src/app/models/items-state.model";
import { createItemAction, createItemOkAction, createItemFailAction, getItemsAction, getItemsOkAction, getItemsFailAction, clearItemsAction, setItemsLoadingAction, getCurrentItemAction, getCurrentItemOkAction, getCurrentItemFailAction } from "../actions/items.actions";



const initialState: ItemsStateModel = {
    items: null,
    isLoading: null,
    getItemsError: null,
    LastEvaluatedKey: null,
    createItemError: null,
    currentItem: null,
    currentItemError: null
};



const itemsReducer = createReducer(
    initialState,

    //create item
    on(createItemAction, (state): ItemsStateModel => ({
        ...state,
        isLoading: true,
        createItemError: null
    })),

    on(createItemOkAction, (state, action): ItemsStateModel => {

        //dispatch item created event
        const itemCreatedEvent = new CustomEvent('itemcreatedevent', {detail: action.item});
        const body = document.querySelector('body');
        body.dispatchEvent(itemCreatedEvent);
        
        //modify state
        return {
            ...state,
            isLoading: false,
            createItemError: null,
        }
    }),

    on(createItemFailAction, (state, action): ItemsStateModel => ({
        ...state,
        isLoading: false,
        createItemError: action.error,
    })),

    on(setItemsLoadingAction, (state, action): ItemsStateModel => ({
        ...state,
        isLoading: action.isLoading
    })),



    //get items
    on(getItemsAction, (state): ItemsStateModel => ({
        ...state,
        isLoading: true,
        getItemsError: null,
    })),

    on(getItemsOkAction, (state, action) => {
        return {
            ...state,
            isLoading: false,
            getItemsError: null,
            items: state.items ? [...state.items, ...action.response.result.Items] : action.response.result.Items,
            LastEvaluatedKey: action.response.result.LastEvaluatedKey ? action.response.result.LastEvaluatedKey : null
        }
    }),

    on(getItemsFailAction, (state, action): ItemsStateModel => ({
        ...state,
        isLoading: false,
        getItemsError: action.error
    })),

    on(clearItemsAction, (state): ItemsStateModel => ({
        ...state,
        items: null,
        isLoading: null,
        getItemsError: null,
        LastEvaluatedKey: null,
        createItemError: null
    })),

    on(getCurrentItemAction, (state): ItemsStateModel => ({
        ...state,
        isLoading: true,
        currentItemError: null
    })),

    on(getCurrentItemOkAction, (state, action): ItemsStateModel => ({
        ...state,
        currentItem: action.item,
        isLoading: false,
        currentItemError: null
    })),

    on(getCurrentItemFailAction, (state, action): ItemsStateModel => ({
        ...state,
        currentItem: null,
        isLoading: false,
        currentItemError: action.error
    })),

)



export function reducers(state: ItemsStateModel, action: Action) {
    return itemsReducer(state, action)
}