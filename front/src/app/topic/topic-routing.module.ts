import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TopicComponent } from "./pages/topic/topic.component";
import { AuthGuard } from "../core/guards/auth.guard";

const routes : Routes = [
    { path: '', component: TopicComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopicRoutingModule {}