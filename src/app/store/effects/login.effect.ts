//ngrx & rxjs imports:
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

//actions imports:
import { loginAction, loginOkAction, loginFailAction } from "../actions/user.actions";

//service import:
import { UsersService } from "src/app/services/users.service";

//models
import { UserModel } from "src/app/models/user.model";
import { LoginResponseModel } from "src/app/models/login-response.model";
import { Router } from "@angular/router";



@Injectable()



export class LoginEffect {

    login$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginAction),
            switchMap(({user}) => {
                return this.usersService.login(user).pipe(
                    
                    map((response: LoginResponseModel) => {
                        localStorage.setItem('token', response.token);
                        return loginOkAction({response})
                    }),

                    catchError((error: any) => {
                        return of(loginFailAction({error: error.error?.error ?? 'Something went wrong'}))
                    })
                )
            })
        )
    )


    
    //redirect after login
    redirectAfterSubmit$ = createEffect( 
        () =>
            this.action$.pipe(
                ofType(loginOkAction),
                tap(() => {
                    this.router.navigateByUrl('/')
                })
            ),
            {dispatch: false}
    )



    constructor(
        private action$: Actions,
        private usersService: UsersService,
        private router: Router
    ) {}
}