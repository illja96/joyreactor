import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedAllComponent } from "./feed-all/feed-all.component";
import { FeedBestComponent } from "./feed-best/feed-best.component";
import { FeedGoodComponent } from "./feed-good/feed-good.component";

const routes: Routes = [
  { path: 'feed/all', pathMatch: 'full', component: FeedAllComponent },
  { path: 'feed/all/:page', pathMatch: 'full', component: FeedAllComponent },
  { path: 'feed', pathMatch: 'full', component: FeedBestComponent },
  { path: 'feed/best', pathMatch: 'full', component: FeedBestComponent },
  { path: 'feed/best/:page', pathMatch: 'full', component: FeedBestComponent },
  { path: 'feed/good', pathMatch: 'full', component: FeedGoodComponent },
  { path: 'feed/good/:page', pathMatch: 'full', component: FeedGoodComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
