import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    declarations: [
        ProfileComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule
    ],
    providers: [],
    exports: [
        ProfileComponent
    ]
})
export class ProfileModule {}