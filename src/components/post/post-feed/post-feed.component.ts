import { Component, Input } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent {
  @Input() public post: JRPost;

  constructor() {
    this.post = undefined!;
  }
}