import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedRoutingModule } from "./feed.routing";
import { FeedIndexComponent } from "./feed-index/feed-index.component";
import { FeedPaginationComponent } from "./feed-pagination/feed-pagination.component";
import { PostModule } from "../post/post.module";

@NgModule({
  declarations: [
    FeedIndexComponent,
    FeedPaginationComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    FeedRoutingModule    
  ]
})
export class FeedModule { }
