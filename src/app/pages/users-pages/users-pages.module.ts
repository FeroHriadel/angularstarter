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

//components
import { UsersListPageComponent } from "./components/users-list-page/users-list-page.component";

//services
import { UsersService } from "src/app/services/users.service";

//redux
import { StoreModule } from "@ngrx/store";
import { reducers } from '../../store/reducers/users.reducer';
import { EffectsModule } from "@ngrx/effects";
import { GetUsersEffect } from "src/app/store/effects/getUsers.effect";
import { GetSearchedUsersEffect } from "src/app/store/effects/getSearchedUsers.effect";



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
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([GetUsersEffect, GetSearchedUsersEffect]),
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
        UsersListPageComponent
    ],
    declarations: [UsersListPageComponent], //components
    providers: [UsersService]
})



export class UsersPagesModule {}