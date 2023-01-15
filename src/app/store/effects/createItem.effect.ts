//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ItemModel, ItemModelWithTagsAsObjects } from "src/app/models/item.model";

//actions imports:
import { createItemAction, createItemOkAction, createItemFailAction } from "../actions/items.actions";

//service import:
import { ItemsService } from "src/app/services/items.service";



@Injectable()



export class CreateItemEffect {

    createItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(createItemAction),
            switchMap(({item}) => {
                return this.itemsService.createItem(item).pipe(
                    
                    map((item: ItemModelWithTagsAsObjects) => {
                        return createItemOkAction({item})
                    }),

                    catchError((error: any) => {
                        return of(createItemFailAction({error: error.error?.error ?? 'Something went wrong'}))
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