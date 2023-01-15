//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { getUsersAction, getUsersOkAction, getUsersFailAction } from "../actions/users.actions";

//service import:
import { UsersService } from "src/app/services/users.service";
import { GetUsersResponseModel } from "src/app/models/getUsers-response.model";




@Injectable()



export class GetUsersEffect {

    getUsers$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUsersAction),
            switchMap(({lastEvaluatedKey}) => {
                return this.usersService.getUsers(lastEvaluatedKey ? lastEvaluatedKey : null).pipe(
                    
                    map((response: GetUsersResponseModel) => {
                        return getUsersOkAction({result: response})
                    }),

                    catchError((error: any) => {
                        return of(getUsersFailAction({error: error.error?.error ?? 'Something went wrong'}))
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