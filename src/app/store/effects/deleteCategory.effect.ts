//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { deleteCategoryAction, deleteCategoryOkAction, deleteCategoryFailAction } from "../actions/category.actions";

//service import:
import { CategoriesService } from "src/app/services/categories.service";
import { CategoryModel } from "src/app/models/category.model";



@Injectable()



export class DeleteCategoryEffect {

    deleteCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategoryAction),
            switchMap(({id}) => {
                return this.categoriesService.deleteCategory(id).pipe(

                    map(({message, ok, id}) => {
                        return deleteCategoryOkAction({message, ok, id})
                    }),

                    catchError((error: any) => {
                        return of(deleteCategoryFailAction({error: error.error?.error ?? 'Something went wrong'}))
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