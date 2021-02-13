import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedRoutingModule } from "./feed.routing";
import { FeedPostComponent } from "./feed-post/feed-post.component";
import { FeedPostCommentsComponent } from "./feed-post-comments/feed-post-comments.component";
import { FeedAllComponent } from "./feed-all/feed-all.component";
import { FeedBestComponent } from "./feed-best/feed-best.component";
import { FeedIndexComponent } from "./feed-index/feed-index.component";

@NgModule({
  declarations: [
    FeedAllComponent,
    FeedBestComponent,
    FeedIndexComponent,
    FeedPostComponent,
    FeedPostCommentsComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule
  ],
  exports: [
    FeedPostComponent
  ]
})
export class FeedModule { }
