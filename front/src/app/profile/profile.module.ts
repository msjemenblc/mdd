import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from './pages/profile/profile.component';
import { MatDividerModule } from "@angular/material/divider";
import { TopicModule } from "../topic/topic.module";

@NgModule({
    declarations: [
        ProfileComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        TopicModule,
        MatDividerModule
    ],
    providers: [],
    exports: [
        ProfileComponent
    ]
})
export class ProfileModule {}