import { Component, Input } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})
export class PostIndexComponent {
  @Input() public post: JRPost;

  constructor() {
    this.post = undefined!;
  }
}