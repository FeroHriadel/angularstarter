//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { TagModel } from "src/app/models/tag.model";

//actions imports:
import { getCategoriesAction, getCategoriesOkAction, getCategoriesFailAction, getCategoryAction } from "../actions/category.actions";
import { getTagsAction, getTagsOkAction, getTagsFailAction } from "../actions/tag.actions";

//service import:
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryModel } from "src/app/models/category.model";
import { TagsService } from "src/app/services/tags.service";



@Injectable()



export class GetTagsEffect {

    getTags$ = createEffect(() =>
        this.action$.pipe(
            ofType(getTagsAction),
            switchMap(() => {
                return this.tagsService.getTags().pipe(
                    
                    map((tags: TagModel[]) => {
                        return getTagsOkAction({tags})
                    }),

                    catchError((error: any) => {
                        return of(getTagsFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    constructor(
        private action$: Actions,
        private categoriesService: CategoriesService,
        private tagsService: TagsService
    ) {}
}