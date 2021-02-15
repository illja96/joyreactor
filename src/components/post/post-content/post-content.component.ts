import { Component, Input, OnInit } from "@angular/core";
import { JRContent } from "src/models/joy-reactor/content.interface";

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {
  @Input() public content: JRContent;

  constructor() {
    this.content = undefined!;
  }

  ngOnInit(): void { }
}