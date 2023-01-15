import { TagModel } from "./tag.model";

export interface TagsStateModel {
    tags: TagModel[] | null
    currentTag: TagModel | null
    isLoading: boolean
    getTagError: string | null
    getTagsError: string | null
    deleteTagError: string | null
    createTagError: string | null
    updateTagError: string | null
}