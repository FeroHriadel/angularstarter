//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { createCategoryAction, createCategoryOkAction, createCategoryFailAction } from "../actions/category.actions";

//service import:
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryModel } from "src/app/models/category.model";



@Injectable()



export class CreateCategoryEffect {

    createCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(createCategoryAction),
            switchMap(({category}) => {
                return this.categoriesService.createCategory({name: category.name, description: category.description}).pipe(
                    
                    map((category: CategoryModel) => {
                        return createCategoryOkAction({category})
                    }),

                    catchError((error: any) => {
                        return of(createCategoryFailAction({error: error.error?.error ?? 'Something went wrong'}))
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