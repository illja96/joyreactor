import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopRoutingModule } from "./top.routing";
import { TopIndexComponent } from "./top-index/top-index.component";
import { TopPaginationComponent } from "./top-pagination/top-pagination.component";
import { PostModule } from "../post/post.module";

@NgModule({
  declarations: [
    TopIndexComponent,
    TopPaginationComponent
  ],
  imports: [
    CommonModule,
    PostModule,
    TopRoutingModule
  ]
})
export class TopModule { }
