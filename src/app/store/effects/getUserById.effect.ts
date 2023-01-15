//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { getUserByIdFailAction, getUserByIdAction, getUserByIdOkAction } from "../actions/user.actions";

//service import:
import { UsersService } from "src/app/services/users.service";

//models
import { UserModel } from "src/app/models/user.model";
import { Router } from "@angular/router";



@Injectable()



export class GetUserByIdEffect {

    getUserById$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUserByIdAction),
            switchMap(({id}) => {
                return this.usersService.getUserById(id).pipe(
                    
                    map((user: UserModel) => {
                        return getUserByIdOkAction({user})
                    }),

                    catchError((error: any) => {
                        return of(getUserByIdFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    constructor(
        private action$: Actions,
        private usersService: UsersService,
        private router: Router
    ) {}
}