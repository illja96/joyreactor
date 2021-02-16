import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedRoutingModule } from "./feed.routing";
import { FeedIndexComponent } from "./feed-index/feed-index.component";
import { PostModule } from "../post/post.module";
import { FeedIndexPaginationComponent } from "./feed-index-pagination/feed-index-pagination.component";

@NgModule({
  declarations: [
    FeedIndexComponent,
    FeedIndexPaginationComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    FeedRoutingModule    
  ]
})
export class FeedModule { }
