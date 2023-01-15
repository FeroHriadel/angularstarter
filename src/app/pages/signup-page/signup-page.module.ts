import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//modules
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

//redux
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CreateUserEffect } from "src/app/store/effects/createUser.effect";
import { LoginEffect } from "src/app/store/effects/login.effect";
import { reducers } from '../../store/reducers/user.reducer';

//services
import { UsersService } from "src/app/services/users.service";

//components
import { SignupPageComponent } from "./components/signup-page/signup-page.component";
import { SigninPageComponent } from "./components/signin-page/signin-page.component";




@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule,
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([CreateUserEffect, LoginEffect]),
    ],
    exports: [
        SignupPageComponent,
        SigninPageComponent,
        MatProgressSpinnerModule, 
        MatFormFieldModule, 
        MatInputModule, MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [SignupPageComponent, SigninPageComponent],
    providers: [UsersService]
})



export class SignupPageModule {}