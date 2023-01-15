//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { updateCategoryAction, updateCategoryOkAction, updateCategoryFailAction } from "../actions/category.actions";

//service import:
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryModel } from "src/app/models/category.model";



@Injectable()



export class UpdateCategoryEffect {

    updateCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategoryAction),
            switchMap(({category}) => {
                return this.categoriesService.updateCategory(category).pipe(
                    
                    map((category: CategoryModel) => {
                        return updateCategoryOkAction({category})
                    }),

                    catchError((error: any) => {
                        return of(updateCategoryFailAction({error: error.error?.error ?? 'Something went wrong'}))
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