import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TopicComponent } from './pages/topic/topic.component';
import { TopicRoutingModule } from "./topic-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        TopicComponent
    ],
    imports: [
        CommonModule,
        TopicRoutingModule,
        SharedModule
    ],
    providers: [],
    exports: [
        TopicComponent
    ]
})
export class TopicModule {}