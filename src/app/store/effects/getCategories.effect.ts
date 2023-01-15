//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { getCategoriesAction, getCategoriesOkAction, getCategoriesFailAction, getCategoryAction } from "../actions/category.actions";

//service import:
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryModel } from "src/app/models/category.model";



@Injectable()



export class GetCategoriesEffect {

    getCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoriesAction),
            switchMap((/* {request} would be here if this wasn't a get call */) => {
                return this.categoriesService.getCategories().pipe(
                    
                    map((categories: CategoryModel[]) => {
                        return getCategoriesOkAction({categories})
                    }),

                    catchError((error: any) => {
                        return of(getCategoriesFailAction({error: error.error?.error ?? 'Something went wrong'}))
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