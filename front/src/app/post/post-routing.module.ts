import { RouterModule, Routes } from "@angular/router";
import { PostComponent } from "./pages/post/post.component";
import { PostDetailsComponent } from "./pages/post-details/post-details.component";
import { PostCreateComponent } from "./pages/post-create/post-create.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: ':id', component: PostDetailsComponent, canActivate: [AuthGuard] },
    { path: '', component: PostComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule {}