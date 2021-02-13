import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedAllComponent } from "./feed-all/feed-all.component";
import { FeedBestComponent } from "./feed-best/feed-best.component";
import { FeedIndexComponent } from "./feed-index/feed-index.component";

const routes: Routes = [
  { path: 'feed/all', pathMatch: 'full', component: FeedAllComponent },
  { path: 'feed/all/:page', pathMatch: 'full', component: FeedAllComponent },
  { path: 'feed', pathMatch: 'full', component: FeedBestComponent },
  { path: 'feed/best', pathMatch: 'full', component: FeedBestComponent },
  { path: 'feed/best/:page', pathMatch: 'full', component: FeedBestComponent },
  { path: 'feed/good', pathMatch: 'full', component: FeedIndexComponent },
  { path: 'feed/good/:page', pathMatch: 'full', component: FeedIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
