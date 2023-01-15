import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

//modules
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

//components
import { CreateItemPageComponent } from "./components/create-item-page/create-item-page.component";
import { ItemsListPageComponent } from "./components/items-list-page/items-list-page.component";
import { ItemCardComponent } from "src/app/components/item-card/item-card.component";
import { ItemDetailPage } from "./components/item-detail-page/items-detail-page.component";

//services
import { ItemsService } from "src/app/services/items.service";

//redux
import { StoreModule } from "@ngrx/store";
import { reducers } from '../../store/reducers/items.reducer';
import { EffectsModule } from "@ngrx/effects";
import { CreateItemEffect } from "src/app/store/effects/createItem.effect";
import { GetItemsEffect } from "src/app/store/effects/getItems.effect";
import { GetItemEffect } from "src/app/store/effects/getCurrentItem.effect";




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatExpansionModule,
        StoreModule.forFeature('items', reducers),
        EffectsModule.forFeature([CreateItemEffect, GetItemsEffect, GetItemEffect]),
    ],
    exports: [ //+ components here
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
        CreateItemPageComponent,
        ItemsListPageComponent,
        ItemCardComponent,
        ItemDetailPage
    ],
    declarations: [CreateItemPageComponent, ItemsListPageComponent, ItemCardComponent, ItemDetailPage], //components
    providers: [ItemsService] //services
})



export class ItemsPagesModule {}