import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagRoutingModule } from "./tag.routing";
import { TagIndexComponent } from "./tag-index/tag-index.component";
import { PostModule } from "../post/post.module";

@NgModule({
  declarations: [
    TagIndexComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    TagRoutingModule
  ]
})
export class TagModule { }