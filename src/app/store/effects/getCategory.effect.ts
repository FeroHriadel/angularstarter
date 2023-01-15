//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { getCategoryAction, getCategoryOkAction, getCategoryFailAction } from "../actions/category.actions";

//service import:
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryModel } from "src/app/models/category.model";



@Injectable()



export class GetCategoryEffect {

    getCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoryAction),
            switchMap(({id}) => {
                return this.categoriesService.getCategory(id).pipe(
                    
                    map((category: CategoryModel) => {
                        return getCategoryOkAction({category})
                    }),

                    catchError((error: any) => {
                        return of(getCategoryFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    //constructor needs this ngrx Action:
    constructor(
        private action$: Actions, //you must do this, whatever it is...
        private categoriesService: CategoriesService
    ) {}
}