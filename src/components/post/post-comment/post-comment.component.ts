import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { JRComment } from "../../../models/joy-reactor/comment.interface";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnChanges {
  @Input() public comment: JRComment;
  public replies: JRComment[];

  @Input() public comments: JRComment[];

  constructor() {
    this.comment = undefined!;
    this.replies = undefined!;

    this.comments = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.comment || !this.comments) return;

    this.replies = [];
    this.comments
      .filter(c => c.parent?.id === this.comment.id)
      .forEach(c => this.replies.push(c));
  }
}