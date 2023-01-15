import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { UserModel } from "src/app/models/user.model";
import { Observable, Subscription } from "rxjs";
import { lastEvaluatedKeySelector, usersErrorSelector, usersIsLoadingSelector, usersSearchedUsersErrorSelector, usersSearchedUsersSelector, usersUsersSelector, searchedUsersLastEvaluatedKeySelector } from "src/app/store/selectors/users.selector";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UsersLastEvaluatedKeyModel } from "src/app/models/users-LastEvaluatedKey.model";
import { clearAllSearchedUsers, clearAllUsers, getSearchedUsersAction, getUsersAction } from "src/app/store/actions/users.actions";
import { FormGroup, FormControl, Validators } from "@angular/forms";



@Component({
    selector: "app-users-list-page",
    templateUrl: "./users-list-page.component.html"
})



export class UsersListPageComponent implements OnInit, OnDestroy {

    //observables and subscriptions
    users$: Observable<UserModel[]>
    isLoading$: Observable<boolean>;
    error$: Observable<string>;
    LastEvaluatedKey$: Observable<UsersLastEvaluatedKeyModel>;
    errorSubs$: Subscription;
    LastEvaluatedKeySubs$: Subscription;
    LastEvaluatedKey: UsersLastEvaluatedKeyModel;

    //searched users
    searchedUsers$: Observable<UserModel[]>
    searchedUsersError$: Observable<string>;
    searchedUsersLastEvaluatedKey$: Observable<{[key: string]: any}>;
    searchedUsersErrorSubs$: Subscription;
    searchedUsersLastEvaluatedKeySubs$: Subscription;
    searchedUsersLastEvaluatedKey: {[key: string]: any};

    //search by email form
    form: FormGroup;
    searchTerm: string;
    
    //snackbar
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    



    constructor(private store: Store<StoreModel>, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.initializeValues();
        this.getUsers(null);
        this.clearSearchedUsers();
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearAllUsers());
        this.errorSubs$.unsubscribe();
        this.LastEvaluatedKeySubs$.unsubscribe();
        this.searchedUsersErrorSubs$.unsubscribe();
        this.searchedUsersLastEvaluatedKeySubs$.unsubscribe();
    }

    initializeValues() {
        //users
        this.users$ = this.store.pipe(select(usersUsersSelector));
        this.isLoading$ = this.store.pipe(select(usersIsLoadingSelector));
        this.error$ = this.store.pipe(select(usersErrorSelector));
        this.LastEvaluatedKey$ = this.store.pipe(select(lastEvaluatedKeySelector));

        //users subscriptions
        this.errorSubs$ = this.error$.subscribe(error => {
            if (error) {
                console.log(error);
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })

        this.LastEvaluatedKeySubs$ = this.LastEvaluatedKey$.subscribe(key => {
            this.LastEvaluatedKey = key;
        })

        //searched users
        this.searchedUsers$ = this.store.pipe(select(usersSearchedUsersSelector));
        this.searchedUsersError$ = this.store.pipe(select(usersSearchedUsersErrorSelector));
        this.searchedUsersLastEvaluatedKey$ = this.store.pipe(select(searchedUsersLastEvaluatedKeySelector));

        //searched users subscriptions
        this.searchedUsersErrorSubs$ = this.searchedUsersError$.subscribe(error => {
            if (error) {
                console.log(error);
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })

        this.searchedUsersLastEvaluatedKeySubs$ = this.searchedUsersLastEvaluatedKey$.subscribe(key => {
            this.searchedUsersLastEvaluatedKey = key
        })

        //search users by email form
        this.form = new FormGroup({
            emailSearch: new FormControl(''),
        });
    }

    getUsers(lastEvaluatedKey?: UsersLastEvaluatedKeyModel) {
        this.store.dispatch(getUsersAction({lastEvaluatedKey}))
    }

    loadMoreUsers() {
        if (this.LastEvaluatedKey$) this.getUsers(this.LastEvaluatedKey);
    }

    clearSearchedUsers() {
        this.store.dispatch(clearAllSearchedUsers());
    }

    searchByEmail() {
        if (this.form.value.emailSearch.trim() === '') return
        this.searchTerm = this.form.value.emailSearch;
        this.store.dispatch(getSearchedUsersAction({emailSearch: this.form.value.emailSearch, lastEvaluatedKey: this.searchedUsersLastEvaluatedKey}))
    }

    clearSearch() {
        this.searchTerm = '';
        this.form.patchValue({emailSearch: ''});
        this.store.dispatch(clearAllSearchedUsers())
    }

}