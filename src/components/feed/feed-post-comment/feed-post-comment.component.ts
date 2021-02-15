import { Component, Input } from "@angular/core";
import { JRComment } from "../../../models/joy-reactor/comment.interface";

@Component({
  selector: 'app-feed-post-comment',
  templateUrl: './feed-post-comment.component.html',
  styleUrls: ['./feed-post-comment.component.css']
})
export class FeedPostCommentComponent {
  @Input() public comment: JRComment;

  constructor() {
    this.comment = undefined!;
  }
}