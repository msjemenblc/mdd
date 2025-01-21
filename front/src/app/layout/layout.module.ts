import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule
    ],
    providers: [],
    exports: [
        HeaderComponent
    ]
})
export class LayoutModule {}