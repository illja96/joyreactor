import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedModule } from "../feed/feed.module";
import { DiscussionIndexComponent } from "./discussion-index/discussion-index.component";
import { DiscussionRoutingModule } from "./discussion.routing";

@NgModule({
  declarations: [
    DiscussionIndexComponent
  ],
  imports: [
    CommonModule,
    FeedModule,
    DiscussionRoutingModule
  ]
})
export class DiscussionModule { }
