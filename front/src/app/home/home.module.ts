import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        RouterModule,
        MatButtonModule
    ],
    providers: [],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {}