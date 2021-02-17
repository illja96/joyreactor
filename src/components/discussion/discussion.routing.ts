import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiscussionIndexComponent } from "./discussion-index/discussion-index.component";

const routes: Routes = [
  { path: 'discussion', pathMatch: 'full', component: DiscussionIndexComponent },
  { path: 'discussion/:type', pathMatch: 'full', component: DiscussionIndexComponent },
  { path: 'discussion/:type/:page', pathMatch: 'full', component: DiscussionIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DiscussionRoutingModule { }