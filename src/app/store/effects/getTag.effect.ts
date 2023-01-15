//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { TagModel } from "src/app/models/tag.model";

//actions imports:
import { getTagAction, getTagOkAction, getTagFailAction } from "../actions/tag.actions";

//service import:
import { TagsService } from "src/app/services/tags.service";




@Injectable()



export class GetTagEffect {

    getTag$ = createEffect(() =>
        this.action$.pipe(
            ofType(getTagAction),
            switchMap(({id}) => {
                return this.tagsService.getTag(id).pipe(
                    
                    map((tag: TagModel) => {
                        return getTagOkAction({tag})
                    }),

                    catchError((error: any) => {
                        return of(getTagFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    //constructor needs this ngrx Action:
    constructor(
        private action$: Actions, //you must do this, whatever it is...
        private tagsService: TagsService
    ) {}
}