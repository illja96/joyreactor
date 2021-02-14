import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedRoutingModule } from "./feed.routing";
import { FeedPostComponent } from "./feed-post/feed-post.component";
import { FeedPostCommentsComponent } from "./feed-post-comments/feed-post-comments.component";
import { FeedIndexComponent } from "./feed-index/feed-index.component";
import { FeedPaginationComponent } from "./feed-pagination/feed-pagination.component";

@NgModule({
  declarations: [
    FeedIndexComponent,
    FeedPaginationComponent,
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