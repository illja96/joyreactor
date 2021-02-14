import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagRoutingModule } from "./tag.routing";
import { TagIndexComponent } from "./tag-index/tag-index.component";
import { FeedModule } from "../feed/feed.module";

@NgModule({
  declarations: [
    TagIndexComponent
  ],
  imports: [
    CommonModule,
    FeedModule,
    TagRoutingModule
  ]
})
export class TagModule { }