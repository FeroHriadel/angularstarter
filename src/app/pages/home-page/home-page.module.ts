import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

//modules:
import { MatButtonModule} from "@angular/material/button";
import { RouterModule } from "@angular/router";

//components:
import { HomePageComponent } from "./components/home-page.component";



@NgModule({
    imports: [CommonModule, MatButtonModule, RouterModule],
    exports: [HomePageComponent, MatButtonModule],
    declarations: [HomePageComponent]
})



export class HomePageModule {}