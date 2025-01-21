import { NgModule } from "@angular/core";
import { PostComponent } from "./pages/post/post.component";
import { CommonModule } from "@angular/common";
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { PostRoutingModule } from "./post-routing.module";

@NgModule({
    declarations: [
        PostComponent,
        PostDetailsComponent,
        PostCreateComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule
    ],
    providers: [],
    exports: [
        PostComponent
    ]
})
export class PostModule {}