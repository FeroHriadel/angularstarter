import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";

//modules
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";

//services
import { TagsService } from "src/app/services/tags.service";

//redux
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { GetTagsEffect } from "src/app/store/effects/getTags.effect";
import { CreateTagEffect } from "src/app/store/effects/createTag.effect";
import { DeleteTagEffect } from "src/app/store/effects/deleteTag.effect";
import { GetTagEffect } from "src/app/store/effects/getTag.effect";
import { UpdateTagEffect } from "src/app/store/effects/updateTag.effect";
import { reducers } from "src/app/store/reducers/tags.reducer";

//components
import { TagsPageComponent } from "./components/tags-page/tags-page.component";
import { CreateTagPageComponent } from "./components/create-tag-page/create-tag-page.component";
import { TagPageComponent } from "./components/tag-page/tag-page.component";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        StoreModule.forFeature('tags', reducers),
        EffectsModule.forFeature([GetTagsEffect, CreateTagEffect, DeleteTagEffect, GetTagEffect, UpdateTagEffect]),
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule
    ],
    declarations: [TagsPageComponent, CreateTagPageComponent, TagPageComponent],
    exports: [
        TagsPageComponent,
        CreateTagPageComponent,
        TagPageComponent,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule
    ],
    providers: [TagsService]
})



export class TagsPagesModule {}