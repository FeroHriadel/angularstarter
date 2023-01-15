//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { GetItemsRequestModel } from "src/app/models/getItems-request.model";
import { GetItemsResponseModel } from "src/app/models/getItems-response.model";

//actions imports:
import { getCurrentItemAction, getCurrentItemOkAction, getCurrentItemFailAction } from "../actions/items.actions";

//service import:
import { ItemsService } from "src/app/services/items.service";
import { ItemModelWithTagsAsObjects } from "src/app/models/item.model";



@Injectable()



export class GetItemEffect {

    getItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCurrentItemAction),
            switchMap(({id}) => {
                return this.itemsService.getItem(id).pipe(
                    
                    map((item: ItemModelWithTagsAsObjects) => {
                        return getCurrentItemOkAction({item})
                    }),

                    catchError((error: any) => {
                        return of(getCurrentItemFailAction({error: error.error?.error ?? 'Something went wrong'}))
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