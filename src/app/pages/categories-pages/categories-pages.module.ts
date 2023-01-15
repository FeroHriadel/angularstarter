import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

//redux
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { GetCategoriesEffect } from "src/app/store/effects/getCategories.effect";
import { GetCategoryEffect } from "src/app/store/effects/getCategory.effect";
import { UpdateCategoryEffect } from "src/app/store/effects/updateCategory.effect";
import { DeleteCategoryEffect } from "src/app/store/effects/deleteCategory.effect";
import { CreateCategoryEffect } from "src/app/store/effects/createCategory.effect";
import { reducers } from '../../store/reducers/categories.reducer';

//services
import { CategoriesService } from "src/app/services/categories.service";

//modules
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";

//components
import { CategoriesPageComponent } from "./components/categories-page/categories-page.component";
import { CategoryPageComponent } from "./components/category-page/category-page.component";
import { CreateCategoryPageComponent } from "./components/create-category-page/create-category-page.component";
import { DeleteDialogComponent } from "src/app/components/delete-dialog/delete-dialog.component";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        StoreModule.forFeature('categories', reducers),
        EffectsModule.forFeature([GetCategoriesEffect, GetCategoryEffect, UpdateCategoryEffect, DeleteCategoryEffect, CreateCategoryEffect]),
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule
    ],
    declarations: [CategoriesPageComponent, CategoryPageComponent, CreateCategoryPageComponent, DeleteDialogComponent],
    exports: [
        CategoriesPageComponent,
        CategoryPageComponent,
        CreateCategoryPageComponent,
        DeleteDialogComponent,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    providers: [CategoriesService]
})



export class CategoriesPagesModule {}