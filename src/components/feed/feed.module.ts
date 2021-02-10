import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedRoutingModule } from "./feed.routing";
import { FeedPostComponent } from "./feed-post/feed-post.component";
import { FeedPostCommentsComponent } from "./feed-post-comments/feed-post-comments.component";

@NgModule({
  declarations: [
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
