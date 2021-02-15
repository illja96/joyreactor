import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostBestCommentsComponent } from "./post-best-comments/post-best-comments.component";
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { PostCommentsComponent } from "./post-comments/post-comments.component";
import { PostContentComponent } from "./post-content/post-content.component";
import { PostIndexComponent } from "./post-index/post-index.component";
import { PostRoutingModule } from "./post.routing";

@NgModule({
  declarations: [
    PostBestCommentsComponent,
    PostCommentComponent,
    PostCommentsComponent,
    PostContentComponent,
    PostIndexComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  exports: [
    PostIndexComponent
  ]
})
export class PostModule { }