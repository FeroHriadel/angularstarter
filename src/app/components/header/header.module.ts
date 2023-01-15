import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

//modules
import { MatButtonModule } from "@angular/material/button";
import {MatToolbarModule} from '@angular/material/toolbar';

//components
import { HeaderComponent } from "./components/header.component";

//services
import { UsersService } from "src/app/services/users.service";

//redux
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { GetUserByIdEffect } from "src/app/store/effects/getUserById.effect";
import { reducers } from "src/app/store/reducers/user.reducer";



@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        MatButtonModule, 
        MatToolbarModule,
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([GetUserByIdEffect]),
    ],
    exports: [HeaderComponent, MatButtonModule, MatToolbarModule],
    declarations: [HeaderComponent],
    providers: [UsersService]
})



export class HeaderModule {}