import { Component, OnDestroy, OnInit } from "@angular/core";
import { TagModel } from "src/app/models/tag.model";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { Store, select } from "@ngrx/store";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { userUserSelector } from "src/app/store/selectors/user.selectors";
import { tagsCurrentTagSelector, tagsGetTagErrorSelector, tagsIsLoadingSelector, tagsUpdateTagErrorSelector } from "src/app/store/selectors/tags.selector";
import { ActivatedRoute } from "@angular/router";
import { clearCurrentTag, getTagAction, updateTagAction } from "src/app/store/actions/tag.actions";
import { TagsService } from "src/app/services/tags.service";



@Component({
    selector: 'app-tag-page',
    templateUrl: './tag-page.component.html'
})



export class TagPageComponent implements OnInit, OnDestroy {

    //snackbar:
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    //form:
    form: FormGroup;

    //store:
    user$: Observable<UserModel>;
    currentTag$: Observable<TagModel>;
    isLoading$: Observable<boolean>;
    getTagError$: Observable<string | null>;
    updateTagError$: Observable<string | null>;

    //tag image:
    tagImage: string | ArrayBuffer;
    fileName: string;
    file: any;

    //subscription
    updateTagErrorSubs$: Subscription;
    currentTagSubs$: Subscription;
    previousTag: TagModel | null;



    constructor(
        private store: Store,
        private snackbar: MatSnackBar,
        private route: ActivatedRoute,
        private tagsService: TagsService
    ) {}



    ngOnInit(): void {
        this.getTag()
        this.initializeValues();
    }

    getTag() {
        const id = this.route.snapshot.paramMap.get('id');
        this.store.dispatch(getTagAction({id}));
    }

    initializeValues() {
        //user
        this.user$ = this.store.pipe(select(userUserSelector));

        //tags
        this.updateTagError$ = this.store.pipe(select(tagsUpdateTagErrorSelector));
        this.getTagError$ = this.store.pipe(select(tagsGetTagErrorSelector));
        this,this.isLoading$ = this.store.pipe(select(tagsIsLoadingSelector));
        this.currentTag$ = this.store.pipe(
            select(tagsCurrentTagSelector),
            filter(Boolean),
            map(currentTag => {
                if (currentTag) {
                    //init form
                    this.form = new FormGroup({
                        name: new FormControl(currentTag.name, [Validators.required]),
                        imageUrl: new FormControl((currentTag.imageUrl && currentTag.imageUrl !== '') ? currentTag.imageUrl : ''),
                        id: new FormControl(currentTag.id)
                    })
                }

                if (currentTag.imageUrl && currentTag.imageUrl !== '') this.tagImage = currentTag.imageUrl;

                return {
                    name: currentTag.name,
                    imageUrl: currentTag.imageUrl,
                    id: currentTag.id,
                    createdAt: currentTag.createdAt
                }
            })
        );

        //subscriptions
        this.updateTagErrorSubs$ = this.updateTagError$.subscribe(error => {
            if (error) {
                this.snackbar.open(error, 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })

        this.currentTagSubs$ = this.currentTag$.subscribe(currentTag => {
            if ((currentTag && this.previousTag) && (this.previousTag.name !== currentTag.name || this.previousTag.imageUrl !== currentTag.imageUrl)) {
                this.snackbar.open('Tag updated', 'OK', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
            this.previousTag = currentTag;
        })
    }

    removeImage() {
        this.tagImage = null;
        this.fileName = null;
        this.file = null;
        this.form.patchValue({imageUrl: ''});
    }

    onImageUpload(event) {
        const file = event.target.files[0]; //grab file from file input
        if (file) {
            //get values
            this.fileName = file.name; //grab file name
            
            //define FileReader.onload and make FileReader read the file:
            const fileReader = new FileReader();
            fileReader.onload = e => {
                this.tagImage = fileReader.result; //image preview for Angular
                this.file = e.target.result //file data for onSubmit image upload
            }
            fileReader.readAsDataURL(file);
        }
    }

    private _pushImageToBucketAndUpdateTag() {
        //get signed url
        fetch(this.tagsService.signedLinkUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')},
            body: JSON.stringify({fileName: this.fileName})
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.error) {
                    console.log(data.error);
                    this.snackbar.open('Getting presigned link failed', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition})
                } else {
                    const url = data.url
                    if (!url) return this.snackbar.open('Getting presigned link failed', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});

                    //do some file-to-base64 magic to get blobData
                    let binary = atob(this.file.split(',')[1]); //removes the image/png from image file
                    let array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i)) //pushes image file characters into the array
                    }
                    let blobData = new Blob([new Uint8Array(array)], {type: 'image/png'});

                    //push image to presigned link
                    let objectUrl = url.split('?')[0]; //aws link where image will be. AWS calls it objectUrl hence the name 
                    fetch(url, {method: 'PUT', body: blobData}) //push blobData to presigned link
                        .then(res2 => {
                            if (!res2.ok) return this.snackbar.open('Saving image to presigned link failed', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
                            
                            //save tag with imageUrl to db
                            const { name } = this.form.value;
                            this.store.dispatch(updateTagAction({tag: {name, imageUrl: objectUrl, id: this.form.value.id}}))
                        })

                }
            })
        .catch(error => {
            this.snackbar.open('Something went wrong', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition})
        })
    }



    onSubmit() {
        //validations
        if (this.form.invalid) return;

        //if user changed image
        if (this.tagImage && this.tagImage !== this.form.value.imageUrl) {
            this._pushImageToBucketAndUpdateTag()
        } 
        //if user didn't change image
        else {
            this.store.dispatch(updateTagAction({tag: {
                name: this.form.value.name, 
                imageUrl: this.form.value.imageUrl, 
                id: this.form.value.id
            }}))
        }
    }




    ngOnDestroy(): void {
        this.updateTagErrorSubs$.unsubscribe();
        this.currentTagSubs$.unsubscribe();
        this.store.dispatch(clearCurrentTag());
        this.previousTag = null;
    }
}