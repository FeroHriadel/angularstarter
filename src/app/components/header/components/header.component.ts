import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { UserModel } from "src/app/models/user.model";
import { getUserByIdAction, signOutAction} from "src/app/store/actions/user.actions";
import { Observable, Subscription } from "rxjs";
import { userIsLoggedInSelector, userUserSelector } from "src/app/store/selectors/user.selectors";



@Component({
    selector: "app-header",
    styleUrls: ["./header.component.scss"],
    templateUrl: './header.component.html'
})



export class HeaderComponent implements OnInit {

    user$: Observable<UserModel>;
    isLoggedIn$: Observable<boolean>;


    constructor(private store: Store<StoreModel>) {}
    
    ngOnInit(): void {
        this.getUser();
        this.initializeValues();
    }

    getUser() {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            const userId = tokenDecode.id;
            this.store.dispatch(getUserByIdAction({id: userId}))
        }
    }

    initializeValues() {
        this.user$ = this.store.pipe(select(userUserSelector));
        this.isLoggedIn$ = this.store.pipe(select(userIsLoggedInSelector));
    }

    signOut() {
        localStorage.removeItem('token');
        this.store.dispatch(signOutAction());
    }
}