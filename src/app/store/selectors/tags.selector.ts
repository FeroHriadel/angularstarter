import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { TagsStateModel } from "src/app/models/tags-state.model";




export const tagsFeatureSelector = (state: StoreModel): TagsStateModel => state.tags;



export const tagsIsLoadingSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.isLoading
);

export const tagsTagsSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.tags
);

export const tagsGetTagsErrorSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.getTagsError
);

export const tagsCreateTagErrorSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.createTagError
);

export const tagsDeleteTagErrorSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.deleteTagError
);

export const tagsCurrentTagSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.currentTag
);

export const tagsGetTagErrorSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.getTagError
);

export const tagsUpdateTagErrorSelector = createSelector(
    tagsFeatureSelector,
    (tagsState: TagsStateModel) => tagsState.updateTagError
)