import { Component, Input } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-index-header',
  templateUrl: './post-index-header.component.html',
  styleUrls: ['./post-index-header.component.css']
})
export class PostIndexHeaderComponent {
  @Input() public post: JRPost;

  constructor() {
    this.post = undefined!;
  }
}