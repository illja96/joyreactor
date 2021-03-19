import { Component, Input, OnChanges } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { JRComment } from "../../../models/joy-reactor/comment.interface";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnChanges {
  @Input() public post: JRPost;
  @Input() public comments: JRComment[];

  public topLevelComments: JRComment[];

  constructor() {
    this.post = undefined!;
    this.comments = undefined!;

    this.topLevelComments = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.post || !this.comments) return;

    this.topLevelComments = this.comments
      .filter(c => c.parent === undefined);
  }
}