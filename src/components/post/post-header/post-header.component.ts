import { Component, Input } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent  {
  @Input() public post: JRPost;

  constructor() {
    this.post = undefined!;
  }
}