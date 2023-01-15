//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { TagModel } from "src/app/models/tag.model";

//actions imports:
import { createTagAction, createTagOkAction, createTagFailAction } from "../actions/tag.actions";

//service import:
import { TagsService } from "src/app/services/tags.service";





@Injectable()



export class CreateTagEffect {

    createTag$ = createEffect(() =>
        this.action$.pipe(
            ofType(createTagAction),
            switchMap(({tag}) => {
                return this.tagsService.createTag({name: tag.name, imageUrl: tag.imageUrl}).pipe(
                    
                    map((tag: TagModel) => {
                        return createTagOkAction({tag})
                    }),

                    catchError((error: any) => {
                        return of(createTagFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    constructor(
        private action$: Actions,
        private tagsService: TagsService
    ) {}
}