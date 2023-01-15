import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { userUserSelector } from "src/app/store/selectors/user.selectors";
import { UserModel } from "src/app/models/user.model";
import { TagModel } from "src/app/models/tag.model";
import { tagsDeleteTagErrorSelector, tagsGetTagsErrorSelector, tagsIsLoadingSelector, tagsTagsSelector } from "src/app/store/selectors/tags.selector";
import { getTagsAction } from "src/app/store/actions/tag.actions";
import { deleteTagAction } from "src/app/store/actions/tag.actions";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "src/app/components/delete-dialog/delete-dialog.component";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
    templateUrl: "./tags-page.component.html",
    selector: "app-tags-page"
})



export class TagsPageComponent implements OnInit, OnDestroy {

    //snackbar
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    
    //redux
    user$: Observable<UserModel>;
    isLoading$: Observable<boolean>;
    getTagsError$: Observable<string | null>;
    deleteTagError$: Observable<string | null>;
    tags$: Observable<TagModel[]>;

    //subscriptions
    getTagsErrorSubs$: Subscription;
    deleteTagErrorSubs$: Subscription;

    constructor(private store: Store<StoreModel>, public dialog: MatDialog, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.initializeValues();
        this.getTags();
    }

    ngOnDestroy(): void {
        this.getTagsErrorSubs$.unsubscribe();
        this.deleteTagErrorSubs$.unsubscribe();
    }

    initializeValues() {
        //user
        this.user$ = this.store.pipe(select(userUserSelector));

        //tags
        this.isLoading$ = this.store.pipe(select(tagsIsLoadingSelector));
        this.getTagsError$ = this.store.pipe(select(tagsGetTagsErrorSelector));
        this.deleteTagError$ = this.store.pipe(select(tagsDeleteTagErrorSelector))
        this.tags$ = this.store.pipe(select(tagsTagsSelector));

        //subscriptions
        this.getTagsErrorSubs$ = this.getTagsError$.subscribe(error => {
            if (error) {
                console.log(error);
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })

        this.deleteTagErrorSubs$ = this.deleteTagError$.subscribe(error => {
            if (error) {
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })
    }

    getTags() {
        this.store.dispatch(getTagsAction());
    }

    deleteTag(tagId: string) {
        const dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'true') {
                this.store.dispatch(deleteTagAction({id: tagId}));
            }
        })
    }
}