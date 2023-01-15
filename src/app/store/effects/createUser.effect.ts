//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { createUserAction, createUserOkAction, createUserFailAction } from "../actions/user.actions";

//service import:
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/user.model";



@Injectable()



export class CreateUserEffect {

    createUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserAction),
            switchMap(({user}) => {
                return this.usersService.createUser({email: user.email, password: user.password}).pipe(
                    
                    map((user: UserModel) => {
                        return createUserOkAction({user})
                    }),

                    catchError((error: any) => {
                        return of(createUserFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )



    //constructor needs this ngrx Action:
    constructor(
        private action$: Actions, //you must do this, whatever it is...
        private usersService: UsersService
    ) {}
}