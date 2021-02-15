import { Component, Input, OnChanges } from "@angular/core";
import { JRComment } from "../../../models/joy-reactor/comment.interface";

@Component({
  selector: 'app-post-best-comments',
  templateUrl: './post-best-comments.component.html',
  styleUrls: ['./post-best-comments.component.css']
})
export class PostBestCommentsComponent implements OnChanges {
  @Input() public comments: JRComment[];

  public topLevelComments: JRComment[];

  constructor() {
    this.comments = undefined!;
    this.topLevelComments = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.comments) return;

    this.topLevelComments = this.comments
      .filter(c => c.parent === undefined);
  }
}