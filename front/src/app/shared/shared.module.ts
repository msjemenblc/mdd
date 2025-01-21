import { NgModule } from "@angular/core";
import { FormComponent } from "./components/form/form.component";
import { BackButtonComponent } from "./components/back-button/back-button.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        FormComponent,
        BackButtonComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [],
    exports: [
        FormComponent,
        BackButtonComponent
    ]
})
export class SharedModule {}