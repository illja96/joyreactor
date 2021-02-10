import { Component, Input } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css']
})
export class FeedPostComponent {
  @Input()
  public post: JRPost;

  constructor() {
    this.post = undefined!;
  }
}