import { NgModule } from "@angular/core";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
    ],
    providers: [],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule {}