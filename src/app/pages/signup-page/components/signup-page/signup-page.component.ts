import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { UserModel } from "src/app/models/user.model";
import { userErrorSelector, userIsLoadingSelector, userUserSelector } from "src/app/store/selectors/user.selectors";
import { clearUserErrorAction, createUserAction } from "src/app/store/actions/user.actions";
import { Router } from "@angular/router";



@Component({
    selector: "app-signup-page",
    templateUrl: "./signup-page.component.html"
})



export class SignupPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;
    user$: Observable<UserModel>;
    
    errorSubscription$: Subscription;
    userSubscription$: Subscription;

    disableForm: boolean = false;
    showSuccess: boolean = false;

    constructor(private store: Store<StoreModel>, private router: Router) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    ngOnDestroy(): void {
        this.errorSubscription$.unsubscribe();
        this.userSubscription$.unsubscribe();
    }

    initializeValues() {
        //store
        this.isLoading$ = this.store.pipe(select(userIsLoadingSelector));
        this.error$ = this.store.pipe(select(userErrorSelector));
        this.user$ = this.store.pipe(select(userUserSelector));

        //subscriptions
        this.errorSubscription$ = this.error$.subscribe(error => {
            if (error) setTimeout(() => {this.store.dispatch(clearUserErrorAction())}, 2000);
        })
        this.userSubscription$ = this.user$.subscribe(user => {
            if (user && user.email) {
                this.disableForm = true;
                this.showSuccess = true;
                setTimeout(() => {this.router.navigate(['/signin'])}, 2000);
            }
        })

        //form
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (this.form.invalid) return
        this.store.dispatch(createUserAction({user: {...this.form.value}}));
    }

}