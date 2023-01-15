import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { Observable, Subscription } from "rxjs";
import { TagModel } from "src/app/models/tag.model";
import { tagsCreateTagErrorSelector, tagsIsLoadingSelector, tagsTagsSelector } from "src/app/store/selectors/tags.selector";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TagsService } from "src/app/services/tags.service";
import { createTagAction } from "src/app/store/actions/tag.actions";



@Component({
    selector: "app-create-page",
    templateUrl: "./create-tag-page.component.html"
})



export class CreateTagPageComponent implements OnInit, OnDestroy {

    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    form: FormGroup;
    imageDisplay: string | ArrayBuffer;
    file: any;
    fileName: string;

    isLoading$: Observable<boolean>;
    tags$: Observable<TagModel[]>;
    createTagError$: Observable<string | null>;

    createErrorTagSubs$: Subscription;
    tagsSubscription$: Subscription;
    firstLoad = true;

    constructor(
        private store: Store<StoreModel>, 
        private formBuilder: FormBuilder, 
        private snackbar: MatSnackBar,
        private tagsService: TagsService
    ) {}

    ngOnInit(): void {
        this.initializeValues()
    }

    ngOnDestroy(): void {
        this.createErrorTagSubs$.unsubscribe();
        this.tagsSubscription$.unsubscribe();
    }

    initializeValues() {
        //ngrx
        this.isLoading$ = this.store.pipe(select(tagsIsLoadingSelector));
        this.tags$ = this.store.pipe(select(tagsTagsSelector));
        this.createTagError$ = this.store.pipe(select(tagsCreateTagErrorSelector));

        //form
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            image: [''], //not necessary => just to show you how to put image in form
            imageUrl: ['']
        })

        //subscriptions
        this.createErrorTagSubs$ = this.createTagError$.subscribe(error => {
            if (error) {
                console.log('error: ', error);
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })

        this.tagsSubscription$ = this.tags$.subscribe(tags => {
            //tags changed = createTag was successful
            if (!this.firstLoad) {
                this.snackbar.open('Tag created', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
                this.form.patchValue({name: 'new tag'});
                this.form.patchValue({image: ''});
                this.form.patchValue({imageUrl: ''});
                this.imageDisplay = null;
                this.file = null;
                this.fileName = null;
            }
        })

        this.firstLoad = false;

    }

    onImageUpload(event) {
        const file = event.target.files[0]; //grab file from file input
        if (file) {
            //get values
            this.fileName = file.name; //grab file name
            this.form.patchValue({image: file}); //put file in form (not necessary => just to show you how to do it)
            this.form.get('image').updateValueAndValidity(); //tell Angular form is okay
            
            //define FileReader.onload and make FileReader read the file:
            const fileReader = new FileReader();
            fileReader.onload = e => {
                this.imageDisplay = fileReader.result; //image preview for Angular
                this.file = e.target.result //file data for onSubmit image upload
            }
            fileReader.readAsDataURL(file);
        }
    }

    private _pushImageToBucketAndSaveTag() {
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
                            console.log('name: ', name)
                            this.store.dispatch(createTagAction({tag: {name, imageUrl: objectUrl}}))
                        })

                }
            })
        .catch(error => {
            this.snackbar.open('Something went wrong', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition})
        })
    }

    removeImage() {
        this.imageDisplay = null;
        this.fileName = null;
        this.file = null;
    }

    onSubmit() {
        if (this.form.invalid) return;
        const { name } = this.form.value;
        if (this.imageDisplay) this._pushImageToBucketAndSaveTag();
        else this.store.dispatch(createTagAction({tag: {name, imageUrl: ''}}))
    }

}