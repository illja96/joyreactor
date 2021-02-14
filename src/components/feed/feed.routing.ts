import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedIndexComponent } from "./feed-index/feed-index.component";

const routes: Routes = [
  { path: 'feed', pathMatch: 'full', component: FeedIndexComponent },
  { path: 'feed/:type', pathMatch: 'full', component: FeedIndexComponent },
  { path: 'feed/:type/page/:page', pathMatch: 'full', component: FeedIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
