import { createAction, props } from "@ngrx/store";
import { TagActionTypes } from "../actionTypes/tag-action.types";
import { TagModel } from "src/app/models/tag.model";



//GET TAGS
export const getTagsAction = createAction(
    TagActionTypes.GET_TAGS
)

export const getTagsOkAction = createAction(
    TagActionTypes.GET_TAGS_OK,
    props<{tags: TagModel[]}>()
)

export const getTagsFailAction = createAction(
    TagActionTypes.GET_TAGS_FAIL,
    props<{error: string}>()
)



//CREATE TAG
export const createTagAction = createAction(
    TagActionTypes.CREATE_TAG,
    props<{tag: TagModel}>()
)

export const createTagOkAction = createAction(
    TagActionTypes.CREATE_TAG_OK,
    props<{tag: TagModel}>()
)

export const createTagFailAction = createAction(
    TagActionTypes.CREATE_TAG_FAIL,
    props<{error: string}>()
)



//DELETE TAG
export const deleteTagAction = createAction(
    TagActionTypes.DELETE_TAG,
    props<{id: string}>()
)

export const deleteTagOkAction = createAction(
    TagActionTypes.DELETE_TAG_OK,
    props<{message: string, ok: Boolean, id: string}>()
)

export const deleteTagFailAction = createAction(
    TagActionTypes.DELETE_TAG_FAIL,
    props<{error: string}>()
)



//GET TAG
export const getTagAction = createAction(
    TagActionTypes.GET_TAG,
    props<{id: string}>()
)

export const getTagOkAction = createAction(
    TagActionTypes.GET_TAG_OK,
    props<{tag: TagModel}>()
)

export const getTagFailAction = createAction(
    TagActionTypes.GET_TAG_FAIL,
    props<{error: string}>()
)

export const clearCurrentTag = createAction(
    TagActionTypes.CLEAR_CURRENT_TAG
)



//UPDATE TAG
export const updateTagAction = createAction(
    TagActionTypes.UPDATE_TAG,
    props<{tag: TagModel}>()
);

export const updateTagOkAction = createAction(
    TagActionTypes.UPDATE_TAG_OK,
    props<{tag: TagModel}>()
);

export const updateTagFailAction = createAction(
    TagActionTypes.UPDATE_TAG_FAIL,
    props<{error: string}>()
)


