import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { NgModule } from "@angular/core";
import { NonAuthGuard } from "../core/guards/non-auth.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}