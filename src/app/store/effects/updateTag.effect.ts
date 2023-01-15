//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { TagModel } from "src/app/models/tag.model";

//actions imports:
import { updateTagAction, updateTagOkAction, updateTagFailAction } from "../actions/tag.actions";



//service import:
import { TagsService } from "src/app/services/tags.service";



@Injectable()



export class UpdateTagEffect {

    updateTag$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateTagAction),
            switchMap(({tag}) => {
                return this.tagsService.updateTag(tag).pipe(
                    
                    map((tag: TagModel) => {
                        return updateTagOkAction({tag})
                    }),

                    catchError((error: any) => {
                        return of(updateTagFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    constructor(
        private action$: Actions,
        private tagsService: TagsService,
    ) {}
}