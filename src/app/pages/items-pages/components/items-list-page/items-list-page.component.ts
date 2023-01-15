//general
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { Observable, Subscription } from "rxjs";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

//user
import { UserModel } from "src/app/models/user.model";
import { userUserSelector } from "src/app/store/selectors/user.selectors";

//items
import { GetItemsRequestModel } from "src/app/models/getItems-request.model";
import { ItemModelWithTagsAsObjects } from "src/app/models/item.model";
import { clearItemsAction, getItemsAction } from "src/app/store/actions/items.actions";
import { itemsGetItemsErrorSelector, itemsIsLoadingSelector, itemsItemsSelector, itemsLastEvaluatedKeySelector } from "src/app/store/selectors/items.selector";

//categories
import { CategoryModel } from "src/app/models/category.model";
import { getCategoriesAction } from "src/app/store/actions/category.actions";
import { categoriesCategoriesSelector, categoriesErrorSelector } from "src/app/store/selectors/categories.selector";

//tags
import { tagsGetTagsErrorSelector, tagsIsLoadingSelector, tagsTagsSelector } from "src/app/store/selectors/tags.selector";
import { getTagsAction } from "src/app/store/actions/tag.actions";
import { TagModel } from "src/app/models/tag.model";



@Component({
    selector: "app-items-list-page",
    templateUrl: "./items-list-page.component.html"
})



export class ItemsListPageComponent implements OnInit, OnDestroy {

    //snackbar
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    //user
    user$: Observable<UserModel>;

    //items
    items$: Observable<ItemModelWithTagsAsObjects[]>;
    itemsSubs$: Subscription;
    isLoading$: Observable<boolean>;
    getItemsError$: Observable<string>;
    LastEvaluatedKey$: Observable<{[key: string]: any}>;
    LastEvaluatedKeySubs$: Subscription;
    LastEvaluatedKey: {[key: string]: any};
    getItemsErrorSubs$: Subscription;
    blockCalls = false;
    requestBody: GetItemsRequestModel = {category: null, tag: null, name: null, dateDirection: null, LastEvaluatedKey: null}

    //categories
    categories$: Observable<CategoryModel[]>;
    categoriesError$: Observable<string>;
    selectedCategory: 'any';

    //tags
    tags$: Observable<TagModel[]>;
    tagsError$: Observable<string>;
    selectedTag: 'any';

    //order by creation date
    selectedDirection = 'none';
    


    constructor(private snackbar: MatSnackBar, private store: Store<StoreModel>) {}

    ngOnInit(): void {
        this.getUser();
        this.initializeItems();
        this.getItems();
        this.addScrollListener();
        this.initializeCategories();
        this.initializeTags();
    }

    ngOnDestroy(): void {
        this.getItemsErrorSubs$.unsubscribe();
        this.LastEvaluatedKeySubs$.unsubscribe();
        this.itemsSubs$.unsubscribe();
        window.removeEventListener('scroll', this.loadMore.bind(this));
        this.store.dispatch(clearItemsAction());
    }

    getUser() {
        this.user$ = this.store.pipe(select(userUserSelector));
    }

    initializeItems() {
        //ngrx
        this.items$ = this.store.pipe(select(itemsItemsSelector));
        this.isLoading$ = this.store.pipe(select(itemsIsLoadingSelector));
        this.getItemsError$ = this.store.pipe(select(itemsGetItemsErrorSelector));
        this.LastEvaluatedKey$ = this.store.pipe(select(itemsLastEvaluatedKeySelector));

        //subscriptions
        this.getItemsErrorSubs$ = this.getItemsError$.subscribe(error => {
            if (error) {
                console.log(error);
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })

        this.LastEvaluatedKeySubs$ = this.LastEvaluatedKey$.subscribe(key => this.LastEvaluatedKey = key);

        this.itemsSubs$ = this.items$.subscribe(items => {
            if (items && !this.LastEvaluatedKey) this.blockCalls = true; //if final batch of items arrived (final batch will have no LastEvaluatedKey) stop further calls
            else this.blockCalls = false
        })

    }

    getItems(requestBody?: GetItemsRequestModel) {
        this.store.dispatch(getItemsAction({requestBody}))
    }

    loadMore() {
        //prevent multiple calls
        if (this.blockCalls) return;

        //get page scroll position
        let scrollY = window.scrollY;
        let pageHeight = document.querySelector('body').scrollHeight;
        let screenHeight = window.screen.height;
        
        //make api call
        if (scrollY + screenHeight >= pageHeight*0.9) {
            this.blockCalls = true; //prevent multiple calls, set back to false in itemsSubs$ when getItems response comes back
            this.getItems({...this.requestBody, LastEvaluatedKey: this.LastEvaluatedKey})
        }
    }

    addScrollListener() {
        window.addEventListener('scroll', this.loadMore.bind(this))        
    }

    initializeCategories() {
        //categories ngrx
        this.categoriesError$ = this.store.pipe(select(categoriesErrorSelector));
        this.categories$ = this.store.pipe(select(categoriesCategoriesSelector));

        //categories call
        this.store.dispatch(getCategoriesAction());
    }

    initializeTags() {
        //tags ngrx
        this.tagsError$ = this.store.pipe(select(tagsGetTagsErrorSelector));
        this.tags$ = this.store.pipe(select(tagsTagsSelector));

        //tags call
        this.store.dispatch(getTagsAction());
    }

    filterByCategory() {
        this.selectedDirection = 'none';
        this.store.dispatch(clearItemsAction());
        this.requestBody = {
            ...this.requestBody, 
            category: this.selectedCategory === 'any' ? null : this.selectedCategory,
            name: null,
            dateDirection: null,
        }
        this.getItems(this.requestBody);
        this.blockCalls = false;
    }

    filterByTag() {
        this.selectedDirection = 'none';
        this.store.dispatch(clearItemsAction());
        this.requestBody = {
            ...this.requestBody, 
            tag: this.selectedTag === 'any' ? null : this.selectedTag,
            name: null,
            dateDirection: null,
            LastEvaluatedKey: null
        }
        this.getItems(this.requestBody);
        this.blockCalls = false;
    }

    searchByName(e) {
        e.preventDefault();
        if (e.target.name.value.trim() === '') return;
        
        //clear category and tag filters
        this.selectedCategory = 'any';
        this.selectedTag = 'any';
        this.selectedDirection = 'none';

        this.store.dispatch(clearItemsAction());
        this.requestBody = {
            category: null, 
            tag: null,
            name: e.target.name.value.trim(),
            dateDirection: null,
            LastEvaluatedKey: null
        }
        this.getItems(this.requestBody);
        this.blockCalls = false;
    }

    orderByDate() {
        this.selectedCategory = 'any';
        this.selectedTag = 'any';
        this.store.dispatch(clearItemsAction());

        this.requestBody = {
            category: null, 
            tag: null,
            name: null,
            dateDirection: this.selectedDirection === 'none' ? null : this.selectedDirection === 'latest' ? 'latest' : 'oldest',
            LastEvaluatedKey: null
        }
        this.getItems(this.requestBody);
        this.blockCalls = false;
    }
}