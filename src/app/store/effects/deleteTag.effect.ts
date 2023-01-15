//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { deleteTagAction, deleteTagOkAction, deleteTagFailAction } from "../actions/tag.actions";

//service import:
import { TagsService } from "src/app/services/tags.service";





@Injectable()



export class DeleteTagEffect {

    deleteTag$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteTagAction),
            switchMap(({id}) => {
                return this.tagsService.deleteTag(id).pipe(

                    map(({message, ok, id}) => {
                        return deleteTagOkAction({message, ok, id})
                    }),

                    catchError((error: any) => {
                        return of(deleteTagFailAction({error: error.error?.error ?? 'Something went wrong'}))
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