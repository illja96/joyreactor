import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagRoutingModule } from "./tag.routing";
import { TagIndexComponent } from "./tag-index/tag-index.component";
import { PostModule } from "../post/post.module";
import { TagListComponent } from "./tag-list/tag-list.component";
import { TagListElementComponent } from "./tag-list-element/tag-list-element.component";
import { TagListPaginationComponent } from "./tag-list-pagination/tag-list-pagination.component";
import { TagIndexPaginationComponent } from "./tag-index-pagination/tag-index-pagination.component";

@NgModule({
  declarations: [
    TagIndexComponent,
    TagIndexPaginationComponent,
    TagListComponent,
    TagListElementComponent,
    TagListPaginationComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    TagRoutingModule
  ]
})
export class TagModule { }