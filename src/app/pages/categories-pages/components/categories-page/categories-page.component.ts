import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "src/app/components/delete-dialog/delete-dialog.component";

//redux & rxjs
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { categoriesIsLoadingSelector, categoriesErrorSelector, categoriesCategoriesSelector } from "src/app/store/selectors/categories.selector";
import { StoreModel } from "src/app/models/store.model";
import { CategoryModel } from "src/app/models/category.model";
import { clearCategoriesError, deleteCategoryAction, getCategoriesAction } from "src/app/store/actions/category.actions";
import { userIsLoggedInSelector, userUserSelector } from "src/app/store/selectors/user.selectors";
import { UserModel } from "src/app/models/user.model";



@Component({
    templateUrl: "./categories-page.component.html",
    selector: "app-categories-page"
})



export class CategoriesPageComponent implements OnInit, OnDestroy {

    user$: Observable<UserModel>;

    isLoading$: Observable<boolean>;
    error$: Observable<string>;
    categories$: Observable<CategoryModel[]>

    errorSubs$: Subscription;
   
    constructor(private store: Store<StoreModel>, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.initializeValues();
        this.getCategories();
    }

    initializeValues() {
        //user
        this.user$ = this.store.pipe(select(userUserSelector));

        //categories
        this.isLoading$ = this.store.pipe(select(categoriesIsLoadingSelector));
        this.error$ = this.store.pipe(select(categoriesErrorSelector));
        this.categories$ = this.store.pipe(select(categoriesCategoriesSelector));

        //subscription
        this.errorSubs$ = this.error$.subscribe(error => {
            if (error === "The conditional request failed") {
                setTimeout(() => {this.store.dispatch(clearCategoriesError())}, 2000);
            }
        });
    }

    getCategories() {
        this.store.dispatch(getCategoriesAction())
    }

    ngOnDestroy(): void { //cleanup => cancel subscription
        this.errorSubs$.unsubscribe();
    }

    deleteCategory(categoryId: string) {
        const dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'true') {
                this.store.dispatch(deleteCategoryAction({id: categoryId}));
            }
        })
    }

}