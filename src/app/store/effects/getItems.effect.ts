//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { GetItemsRequestModel } from "src/app/models/getItems-request.model";
import { GetItemsResponseModel } from "src/app/models/getItems-response.model";

//actions imports:
import { getItemsAction, getItemsOkAction, getItemsFailAction } from "../actions/items.actions";

//service import:
import { ItemsService } from "src/app/services/items.service";



@Injectable()



export class GetItemsEffect {

    getItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(getItemsAction),
            switchMap(({requestBody}) => {
                return this.itemsService.getItems(requestBody).pipe(
                    
                    map((response: GetItemsResponseModel) => {
                        return getItemsOkAction({response})
                    }),

                    catchError((error: any) => {
                        return of(getItemsFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    constructor(
        private action$: Actions,
        private itemsService: ItemsService,
    ) {}
}