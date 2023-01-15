import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { createCategoryAction, getCategoriesAction } from "src/app/store/actions/category.actions";
import { categoriesCategoriesSelector, categoriesErrorSelector, categoriesIsLoadingSelector } from "src/app/store/selectors/categories.selector";
import { CategoryModel } from "src/app/models/category.model";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
    selector: 'app-create-category-page',
    templateUrl: './create-category-page.component.html'
})



export class CreateCategoryPageComponent implements OnInit, OnDestroy {

    //snackbar:
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    //form
    form: FormGroup;

    //redux
    isLoading$: Observable<boolean>;
    categories$: Observable<CategoryModel[]>;
    error$: Observable<string>;

    //subscriptions
    errorSubscription$: Subscription;
    categoriesSubscription$: Subscription;
    previousCategories: CategoryModel[]; //keeps track of previous state.categories value


    constructor(private store: Store<StoreModel>, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.initializeValues()
    }

    ngOnDestroy(): void {
        this.errorSubscription$.unsubscribe();
        this.categoriesSubscription$.unsubscribe();
    }

    initializeValues() {
        //form
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('')
        });

        //store
        this.store.dispatch(getCategoriesAction());
        this.categories$ = this.store.pipe(select(categoriesCategoriesSelector));
        this.isLoading$ = this.store.pipe(select(categoriesIsLoadingSelector));
        this.error$ = this.store.pipe(select(categoriesErrorSelector));

        //subscriptions
        this.errorSubscription$ = this.error$.subscribe(error => {
            if (error) this.snackbar.open(error, 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
        })
        this.categoriesSubscription$ = this.categories$.subscribe(categories => {
            if (!this.previousCategories) { //populate prevCats on first load
                this.previousCategories = categories
                return
            }
            if (this.previousCategories && this.previousCategories.length < categories.length) {
                this.snackbar.open('Category created', 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
                this.form.reset();
                this.form.controls['name'].setErrors(null);
                this.previousCategories = categories;
            }
        })
    }

    onSubmit() {
        if (this.form.invalid) return;
        this.store.dispatch(createCategoryAction({category: this.form.value}));
    }

}