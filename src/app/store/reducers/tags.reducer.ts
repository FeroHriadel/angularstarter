import { createReducer, on, Action } from "@ngrx/store";
import { TagsStateModel } from "src/app/models/tags-state.model";
import { getTagsAction, getTagsOkAction, getTagsFailAction, createTagAction, createTagOkAction, createTagFailAction, deleteTagAction, deleteTagOkAction, deleteTagFailAction, getTagAction, getTagOkAction, getTagFailAction, updateTagAction, updateTagOkAction, updateTagFailAction, clearCurrentTag } from "../actions/tag.actions";




const initialState: TagsStateModel = {
    tags: null,
    currentTag: null,
    isLoading: false,
    getTagError: null,
    getTagsError: null,
    deleteTagError: null,
    createTagError: null,
    updateTagError: null,
};



const tagsReducer = createReducer(
    initialState,

    //get tags
    on(getTagsAction, (state): TagsStateModel => ({
        ...state,
        isLoading: true,
        getTagsError: null
    })),

    on(getTagsOkAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        getTagsError: null,
        tags: [...action.tags].sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
            if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
            return 0;
        })
    })),

    on(getTagsFailAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        getTagsError: action.error
    })),



    //create tag
    on(createTagAction, (state): TagsStateModel => ({
        ...state,
        isLoading: true,
        createTagError: null
    })),

    on(createTagOkAction, (state, action) => ({
        ...state,
        isLoading: false,
        createTagError: null,
        tags: state.tags ? [action.tag, ...state.tags] : [action.tag]
    })),

    on(createTagFailAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        createTagError: action.error,
    })),



    //delete tag
    on(deleteTagAction, (state): TagsStateModel => ({
        ...state,
        isLoading: true,
        deleteTagError: null
    })),

    on(deleteTagOkAction, (state, action): TagsStateModel => {
        let newTagsArr = null;
        if (state.tags) {
            const deletedTagIdx = state.tags.findIndex(t => t.id === action.id);
            newTagsArr = [...state.tags];
            newTagsArr.splice(deletedTagIdx, 1);
        }

        let isCurrentTagBeingDeleted = false;
        if (state.currentTag && state.currentTag.id) {
            if (state.currentTag.id === action.id) isCurrentTagBeingDeleted = true; 
        } 

        return {
            ...state,
            isLoading: false,
            deleteTagError: null,
            tags: newTagsArr ? newTagsArr : state.tags,
            currentTag: isCurrentTagBeingDeleted ? null : state.currentTag
        }
    }),

    on(deleteTagFailAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        deleteTagError: action.error
    })),



    //current tag
    on(getTagAction, (state): TagsStateModel => ({
        ...state,
        isLoading: true,
        getTagError: null
    })),

    on(getTagOkAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        getTagError: null,
        currentTag: action.tag
    })),

    on(getTagFailAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        currentTag: null,
        getTagError: action.error
    })),

    on(clearCurrentTag, (state): TagsStateModel => ({
        ...state,
        currentTag: null
    })),



    //update tag
    on(updateTagAction, (state): TagsStateModel=> ({
        ...state,
        isLoading: true,
        updateTagError: null
    })),

    on(updateTagOkAction, (state, action): TagsStateModel => {
        let newTagsArr = null;
        if (state.tags) {
            const updatedTagIdx = state.tags.findIndex(t => t.id === action.tag.id);
            newTagsArr = [...state.tags];
            newTagsArr.splice(updatedTagIdx, 1, action.tag);
        }

        return {
            ...state,
            isLoading: false,
            updateTagError: null,
            tags: newTagsArr ? newTagsArr : state.tags,
            currentTag: action.tag,
        }
    }),

    on(updateTagFailAction, (state, action): TagsStateModel => ({
        ...state,
        isLoading: false,
        updateTagError: action.error
    }))
)



export function reducers(state: TagsStateModel, action: Action) {
    return tagsReducer(state, action)
}