import { NgModule } from "@angular/core";
import { PostComponent } from "./pages/post/post.component";
import { CommonModule } from "@angular/common";
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { PostRoutingModule } from "./post-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        PostComponent,
        PostDetailsComponent,
        PostCreateComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule
    ],
    providers: [],
    exports: [
        PostComponent
    ]
})
export class PostModule {}