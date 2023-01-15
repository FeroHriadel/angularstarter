//basic imports
import { Component, OnInit, OnDestroy} from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";

//redux & rxjs
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { ItemModelWithTagsAsObjects } from "src/app/models/item.model";
import { getCurrentItemAction } from "src/app/store/actions/items.actions";
import { itemsCurrentItemErrorSelector, itemsCurrentItemSelector, itemsIsLoadingSelector } from "src/app/store/selectors/items.selector";


@Component({
    selector: 'app-item-detail-page',
    templateUrl: './items-detail-page.component.html'
})



export class ItemDetailPage implements OnInit, OnDestroy {

    //snackbar:
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    //item
    isLoading$: Observable<boolean>;
    item$: Observable<ItemModelWithTagsAsObjects>;
    error$: Observable<string>;
    errorSubs$: Subscription;



    constructor(private store: Store<StoreModel>, private route: ActivatedRoute, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.initializeValues();
        this.getItem();
    }

    ngOnDestroy(): void {
        this.errorSubs$.unsubscribe();
    }

    initializeValues() {
        this.isLoading$ = this.store.pipe(select(itemsIsLoadingSelector));
        this.error$ = this.store.pipe(select(itemsCurrentItemErrorSelector));
        this.item$ = this.store.pipe(select(itemsCurrentItemSelector));
        
        this.errorSubs$ = this.error$.subscribe(error => {
            if (error) this.snackbar.open(error, 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
        })
    }

    getItem() {
        const id = this.route.snapshot.paramMap.get('id');
        this.store.dispatch(getCurrentItemAction({id}));
    }

}