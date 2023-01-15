//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { getSearchedUsersAction, getSearchedUsersOkAction, getSearchedUsersFailAction } from "../actions/users.actions";

//service import:
import { UsersService } from "src/app/services/users.service";
import { GetUsersResponseModel } from "src/app/models/getUsers-response.model";




@Injectable()



export class GetSearchedUsersEffect {

    getSearchedUsers$ = createEffect(() =>
        this.action$.pipe(
            ofType(getSearchedUsersAction),
            switchMap(({emailSearch, lastEvaluatedKey}) => {
                return this.usersService.getSearchedUsers(emailSearch, lastEvaluatedKey ? lastEvaluatedKey : null).pipe(
                    
                    map((response: GetUsersResponseModel) => {
                        return getSearchedUsersOkAction({result: response})
                    }),

                    catchError((error: any) => {
                        return of(getSearchedUsersFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )




    constructor(
        private action$: Actions,
        private usersService: UsersService,
    ) {}
}