import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { UserModel } from "src/app/models/user.model";
import { userErrorSelector, userIsLoadingSelector, userIsLoggedInSelector, userUserSelector } from "src/app/store/selectors/user.selectors";
import { Observable, Subscription } from "rxjs";
import { loginAction } from "src/app/store/actions/user.actions";




@Component({
    selector: "app-signin-page",
    templateUrl: "./signin-page.component.html"
})



export class SigninPageComponent implements OnInit, OnDestroy {

    form: FormGroup;

    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;
    user$: Observable<UserModel>;
    isLoggedIn$: Observable<boolean>;

    constructor(private store: Store<StoreModel>) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    ngOnDestroy(): void {
        
    }

    initializeValues() {
        //store
        this.isLoading$ = this.store.pipe(select(userIsLoadingSelector));
        this.error$ = this.store.pipe(select(userErrorSelector));
        this.user$ = this.store.pipe(select(userUserSelector));
        this.isLoggedIn$ = this.store.pipe(select(userIsLoggedInSelector));

        //form
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        this.store.dispatch(loginAction({user: {...this.form.value}}));
    }
}
