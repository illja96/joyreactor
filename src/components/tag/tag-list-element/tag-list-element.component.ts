import { Component, Input } from "@angular/core";
import { JRBlog } from "src/models/joy-reactor/blog.interface";

@Component({
  selector: 'app-tag-list-element',
  templateUrl: './tag-list-element.component.html',
  styleUrls: ['./tag-list-element.component.css']
})
export class TagListElementComponent {
  @Input() public tag: JRBlog;

  constructor() {
    this.tag = undefined!;
  }
}