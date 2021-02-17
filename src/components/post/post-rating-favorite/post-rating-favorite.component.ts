import { Component, Input } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-rating-favorite',
  templateUrl: './post-rating-favorite.component.html',
  styleUrls: ['./post-rating-favorite.component.css']
})
export class PostRatingFavoriteComponent {
  @Input() public post: JRPost;

  constructor() {
    this.post = undefined!;
  }
}