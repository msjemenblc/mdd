import { RouterModule, Routes } from "@angular/router";
import { PostComponent } from "./pages/post/post.component";
import { PostDetailsComponent } from "./pages/post-details/post-details.component";
import { PostCreateComponent } from "./pages/post-create/post-create.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'create', component: PostCreateComponent },
    { path: ':id', component: PostDetailsComponent },
    { path: '', component: PostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule {}