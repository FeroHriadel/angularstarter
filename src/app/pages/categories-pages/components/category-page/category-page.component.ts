import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

//redux & rxjs
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { categoriesIsLoadingSelector, categoriesErrorSelector, currentCategorySelector } from "src/app/store/selectors/categories.selector";
import { StoreModel } from "src/app/models/store.model";
import { CategoryModel } from "src/app/models/category.model";
import { clearCategoriesError, clearCurrentCategoryAction, getCategoryAction, updateCategoryAction } from "src/app/store/actions/category.actions";
import { UserModel } from "src/app/models/user.model";
import { userUserSelector } from "src/app/store/selectors/user.selectors";



@Component({
    templateUrl: "./category-page.component.html",
    selector: "app-category-page"
})



export class CategoryPageComponent implements OnInit, OnDestroy {

    //snackbar:
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    //these will come from store
    isLoading$: Observable<boolean>; 
    error$: Observable<string>;
    currentCategory$: Observable<CategoryModel>;
    user$: Observable<UserModel>

    //subscriptions (sorry, bad store design, had to resort to subs)
    errorSubscription$: Subscription;
    updateSubscription$: Subscription;
    previousCategory: CategoryModel; //previous category value

    //form
    form: FormGroup;
    
   
    constructor(private store: Store<StoreModel>, private route: ActivatedRoute, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.initializeValues();
        this.getCategory();
    }

    ngOnDestroy(): void {
        this.updateSubscription$.unsubscribe();
        this.errorSubscription$.unsubscribe();
        this.store.dispatch(clearCurrentCategoryAction())
    }

    initializeValues() {
        this.user$ = this.store.pipe(select(userUserSelector));
        this.isLoading$ = this.store.pipe(select(categoriesIsLoadingSelector));
        this.error$ = this.store.pipe(select(categoriesErrorSelector));
        
        //this is a trick-of-the-trade how to populate form values without subscription:
        this.currentCategory$ = this.store.pipe(
            select(currentCategorySelector),
            filter(Boolean), //rxjs likes to have this step here, dunno why I think it works without it too
            map((currentCategory: CategoryModel) => { //init form and/or populate currentCategory$ like this:
                //console.log(currentCategory);

                //init form
                this.form = new FormGroup({
                    name: new FormControl(currentCategory.name, [Validators.required]),
                    description: new FormControl(currentCategory.description || '')
                });

                //populate currentCategory$
                return {
                    name: currentCategory.name,
                    description: currentCategory.description || '',
                    id: currentCategory.id,
                    createdAt: currentCategory.createdAt
                }
            })
        )

        //listen for updates in currentCategory (had to use subs after all because of bad store design)
        this.updateSubscription$ = this.currentCategory$.subscribe(c => {
            if (this.previousCategory) {
                if (this.previousCategory.name !== c.name || this.previousCategory.description !== c.description) {
                    this.snackbar.open('Category updated', 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
                }
            } 
            this.previousCategory = c;
        })

        //clear "Category with name "category 2" already exists" error after 2 seconds
        this.errorSubscription$ = this.error$.subscribe(error => {
            if (error === `Category with name "category 2" already exists`) {
                setTimeout(() => {this.store.dispatch(clearCategoriesError());}, 2000);
            }
        })
    }

    getCategory() {
        const id = this.route.snapshot.paramMap.get('id');
        this.store.dispatch(getCategoryAction({id}));
    }

    onSubmit() {
        if (this.form.invalid) return
        if (this.previousCategory && this.previousCategory.name === this.form.value.name && this.previousCategory.description === this.form.value.description) {
            this.store.dispatch(clearCategoriesError());
            this.snackbar.open('You changed nothing', 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            return
        }


        const updatedCategory = {
            ...this.form.value,
            id: this.route.snapshot.paramMap.get('id')
        }

        this.store.dispatch(updateCategoryAction({category: updatedCategory}));
    }

}