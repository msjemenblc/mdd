import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { NonAuthGuard } from "../core/guards/non-auth.guard";

const routes : Routes = [
    { path: '', component: HomeComponent, canActivate: [NonAuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}