export enum ItemsActionTypes {
    CREATE_ITEM = '[Items] create item',  
    CREATE_ITEM_OK = '[Items] create item ok',  
    CREATE_ITEM_FAIL = '[Items] create item fail',
    SET_ITEMS_LOADING = '[Items] set items loading',

    GET_ITEMS = '[Items] get items',
    GET_ITEMS_OK = '[Items] get items ok',
    GET_ITEMS_FAIL = '[Items] get items fail',
    CLEAR_ITEMS = '[Items] clear items',

    GET_CURRENT_ITEM = '[Items] get current item',
    GET_CURRENT_ITEM_OK = '[Items] get current item ok',
    GET_CURRENT_ITEM_FAIL = '[Items] get current item fail',

    DELETE_ITEM = '[Items] delete item',
    DELETE_ITEM_OK = '[Items] delete item ok',
    DELETE_ITEM_FAIL = '[Items] delete item fail',
}