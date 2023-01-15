//general
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { StoreModel } from "src/app/models/store.model";
import { Observable, ReplaySubject, Subscription } from "rxjs";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

//categories
import { CategoryModel } from "src/app/models/category.model";
import { categoriesIsLoadingSelector, categoriesErrorSelector, categoriesCategoriesSelector } from "src/app/store/selectors/categories.selector";
import { getCategoriesAction } from "src/app/store/actions/category.actions";

//tags
import { tagsGetTagsErrorSelector, tagsIsLoadingSelector, tagsTagsSelector } from "src/app/store/selectors/tags.selector";
import { getTagsAction } from "src/app/store/actions/tag.actions";
import { TagModel } from "src/app/models/tag.model";

//items
import { ItemsService } from "src/app/services/items.service";
import { itemsIsLoadingSelector, itemsCreateItemErrorSelector } from "src/app/store/selectors/items.selector";
import { createItemAction, setItemsLoadingAction } from "src/app/store/actions/items.actions";



@Component({
    selector: "app-create-item-page",
    templateUrl: "./create-item-page.component.html"
})



export class CreateItemPageComponent implements OnInit, OnDestroy {

    //snackbar
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    //categories
    categories$: Observable<CategoryModel[]>;
    categoriesLoading$: Observable<boolean>;
    categoriesError$: Observable<string>;

    //tags
    tags$: Observable<TagModel[]>;
    tagsLoading$: Observable<boolean>;
    tagsError$: Observable<string>;

    //main image
    mainImageFileName: string;
    mainImageDisplay: string | ArrayBuffer;
    mainImageFile: any;

    //additional images
    imagesFileNames: any[] = [];
    imagesDisplays: any[] = [];
    imagesFiles: any[] = [];
    
    //item
    form: FormGroup;
    isLoading$: Observable<boolean>;
    error$: Observable<string>;
    errorSubs$: Subscription;
    blockSubmit = false;



    constructor(
        private formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private store: Store<StoreModel>,
        private itemsService: ItemsService
    ) {}

    ngOnInit(): void {
        this.initializeCategories();
        this.initializeTags();
        this.initializeItems();
        this.addItemCreatedEventListener();
    }

    ngOnDestroy(): void {
        this.errorSubs$.unsubscribe();
        const body = document.querySelector('body');
        body.removeEventListener('itemcreatedevent', this.itemCreatedEventAction.bind(this));
    }

    initializeCategories() {
        //categories ngrx
        this.categoriesLoading$ = this.store.pipe(select(categoriesIsLoadingSelector));
        this.categoriesError$ = this.store.pipe(select(categoriesErrorSelector));
        this.categories$ = this.store.pipe(select(categoriesCategoriesSelector));

        //categories call
        this.store.dispatch(getCategoriesAction());
    }

    initializeTags() {
        //tags ngrx
        this.tagsLoading$ = this.store.pipe(select(tagsIsLoadingSelector));
        this.tagsError$ = this.store.pipe(select(tagsGetTagsErrorSelector));
        this.tags$ = this.store.pipe(select(tagsTagsSelector));

        //tags call
        this.store.dispatch(getTagsAction());
    }

    initializeItems() {
        //items ngrx
        this.isLoading$ = this.store.pipe(select(itemsIsLoadingSelector));
        this.error$ = this.store.pipe(select(itemsCreateItemErrorSelector));

        //form
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            category: ['', Validators.required],
            tags: [[]],
            mainImage: [''],
            images: [[]]
        })

        //subscription
        this.errorSubs$ = this.error$.subscribe(error => {
            if (error) {
                console.log('error: ', error);
                this.snackbar.open(error, 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            }
        })
    }

    toggleTag(tagId: string) {
        //push clicked tag to form
        let tags = [...this.form.value.tags];
        let tagIdx = tags.findIndex(t => t === tagId);
        if (tagIdx === -1) {
            tags.push(tagId);
        } else {
            tags.splice(tagIdx, 1);
        }
        this.form.patchValue({tags});

        //highlight
        const clickedTag = document.getElementById(tagId);
        clickedTag.classList.toggle('highlighted');
    }

    onMainImageUpload(event) {
        const file = event.target.files[0]; //grab file from file input
        if (file) {
            //get values
            this.mainImageFileName = file.name; //grab file name
            
            //define FileReader.onload and make FileReader read the file:
            const fileReader = new FileReader();
            fileReader.onload = e => {
                this.mainImageDisplay = fileReader.result; //image preview for Angular
                this.mainImageFile = e.target.result //file data for onSubmit image upload
            }
            fileReader.readAsDataURL(file);
        }
    }

    removeMainImage() {
        this.mainImageDisplay = null;
        this.mainImageFileName = null;
        this.mainImageFile = null;
    }

    onImagesUpload(event) {
        const files = event.target.files;
        const imagesInput = document.getElementById('images-input')!;
        if (files.length > 5) {
            this.snackbar.open('Max 5 images is allowed', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            (imagesInput as HTMLInputElement).value = '';
            this.imagesDisplays = [];
            this.imagesFiles = [];
            return
        }

        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                this.imagesFileNames.push(files[i].name);
                const fileReader = new FileReader();
                fileReader.onload = e => {
                    // this.imagesDisplays[i] = fileReader.result;
                    // this.imagesFiles[i] = e.target.result
                    this.imagesDisplays.push(fileReader.result);
                    this.imagesFiles.push(e.target.result);
                }
                fileReader.readAsDataURL(files[i])
            }
        }
    }

    removeImage(idx) {
        this.imagesDisplays.splice(idx, 1);
        this.imagesFiles.splice(idx, 1);
    }

    private _pushImagesToBucketAndSaveItem() {

        this.store.dispatch(setItemsLoadingAction({isLoading: true}));

        let mainImageObjectUrl: any = null; //main image url will come here
        let imagesObjectUrls: any[] = [];
        let self = this; //promises below have a problem with the `this` word, that's why we have `self` here
        
        function pushMainImageToS3() {
            return new Promise((resolve, reject) => {
                if (self.mainImageDisplay) {
                    //get signed url for main image
                    fetch(self.itemsService.signedLinkUrl, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')},
                        body: JSON.stringify({fileName: self.mainImageFileName})
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data && data.error) {
                                console.log(data.error);
                                reject({ok: false, error: 'Getting presigned link for main image failed'})
                            } else {
                                const url = data.url
                                if (!url) reject({ok: false, error: 'Getting presigned link for main image failed'})
    
                                //do some file-to-base64 magic to get blobData
                                let binary = atob(self.mainImageFile.split(',')[1]); //removes the image/png from image file
                                let array = [];
                                for (var i = 0; i < binary.length; i++) {
                                    array.push(binary.charCodeAt(i)) //pushes image file characters into the array
                                }
                                let blobData = new Blob([new Uint8Array(array)], {type: 'image/png'});
    
                                //push main image to presigned link
                                mainImageObjectUrl = url.split('?')[0]; //aws link where image will be. AWS calls it objectUrl hence the name 
                                fetch(url, {method: 'PUT', body: blobData}) //push blobData to presigned link
                                    .then(res2 => {
                                        if (!res2.ok) reject({ok: false, error: 'Saving main image to presigned link failed'});
                                        else resolve({ok: true});
                                    })
                            }
                        })
                    .catch(error => {
                        console.log(error);
                        reject({ok: false, error: 'Something went wrong when uploading the main image'})
                    })
                } else resolve({ok: true})
            })
        }

        function pushAdditionalImagesToS3(): Promise<{ok: boolean, imagesObjectUrls: string[]}> {
            return new Promise((resolve, reject) => {
                if (self.imagesFiles.length) {
                    for (let i = 0; i < self.imagesDisplays.length; i++) {
        
                        fetch(self.itemsService.signedLinkUrl, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')},
                            body: JSON.stringify({fileName: self.imagesFileNames[i]})
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data && data.error) {
                                    console.log(data.error);
                                    reject({ok: false, error: 'Getting presigned link for additional image failed'})
                                } else {
                                    const url = data.url
                                    if (!url) reject({ok: false, error: 'Getting presigned link for additional image failed'})
            
                                    //do some file-to-base64 magic to get blobData
                                    let binary = atob(self.imagesFiles[i].split(',')[1]);
                                    let array = [];
                                    for (var j = 0; j < binary.length; j++) {
                                        array.push(binary.charCodeAt(j))
                                    }
                                    let blobData = new Blob([new Uint8Array(array)], {type: 'image/png'});
            
                                    //push main image to presigned link
                                    let imageObjectUrl = url.split('?')[0];
                                    imagesObjectUrls = [...imagesObjectUrls, imageObjectUrl]; // .push() threw `non-extendible` error, had to do this

                                    fetch(url, {method: 'PUT', body: blobData})
                                        .then(res2 => {
                                            if (!res2.ok) reject({ok: false, error: 'Saving additional image to presigned link failed'})
                                            else if (i === self.imagesFiles.length - 1) resolve({ok: true, imagesObjectUrls}); //had to pass imagesObjectUrls here because the .then() block below reads let imagesObjectUrls from the top of this function as an empty array
                                        })
                                }
                            })
                        .catch(error => {
                            console.log(error);
                            reject({ok: false, error: 'Something went wrong when uploading additional images'})
                        })
        
                    }
                } else resolve({ok: true, imagesObjectUrls: null});
            })
        }
    
        pushMainImageToS3()
            .then(() => {
                return pushAdditionalImagesToS3();
            })
            .then(done => {
                this.store.dispatch(setItemsLoadingAction({isLoading: false}));
                this.store.dispatch(createItemAction({
                    item: {
                        ...this.form.value, 
                        mainImage: mainImageObjectUrl, 
                        images: done.imagesObjectUrls ? done.imagesObjectUrls : []
                    }
                }))
            })
            .catch(err => {
                console.log(err);
                this.blockSubmit = false;
                this.snackbar.open(err.error || 'Something went wrong', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
            })
    }

    itemCreatedEventAction() {
        this.snackbar.open('Item created', 'ok', {duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
        this.form.reset();
        this.form.patchValue({ tags: [], images: []}); //reset makes it null, but we need an array
        this.mainImageFileName = null;
        this.mainImageDisplay = null;
        this.mainImageFile = null;
        this.imagesDisplays = [];
        this.imagesFiles = [];
        this.imagesFileNames = [];
        const tagElements = document.querySelectorAll('.main-tag-wrapper');
        tagElements.forEach(tag => tag.classList.remove('highlighted'));
        this.blockSubmit = false;
    }

    addItemCreatedEventListener() {
        const body = document.querySelector('body');
        body.addEventListener('itemcreatedevent', this.itemCreatedEventAction.bind(this))
    }

    onSubmit() {
        if (this.form.invalid) return;
        this.blockSubmit = true;
        if (this.mainImageDisplay || this.imagesDisplays.length) this._pushImagesToBucketAndSaveItem();
        else this.store.dispatch(createItemAction({item: {...this.form.value}}));
    }

}