import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostBestCommentsComponent } from "./post-best-comments/post-best-comments.component";
import { PostCommentComponent } from "./post-comment/post-comment.component";
import { PostCommentsComponent } from "./post-comments/post-comments.component";
import { PostContentComponent } from "./post-content/post-content.component";
import { PostIndexComponent } from "./post-index/post-index.component";
import { PostRoutingModule } from "./post.routing";
import { PostCommentContentComponent } from "./post-comment-content/post-comment-content.component";
import { PostHeaderComponent } from "./post-header/post-header.component";
import { PostShareButtonComponent } from "./post-share-button/post-share-button.component";
import { PostRatingFavoriteComponent } from "./post-rating-favorite/post-rating-favorite.component";

@NgModule({
  declarations: [
    PostBestCommentsComponent,
    PostCommentComponent,
    PostCommentContentComponent,
    PostCommentsComponent,
    PostContentComponent,
    PostHeaderComponent,
    PostIndexComponent,
    PostShareButtonComponent,
    PostRatingFavoriteComponent
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