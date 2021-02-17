import { Component, Input, OnChanges } from "@angular/core";
import { FeedType } from "../../../models/feed/feed-type.enum";
import { JRBlog } from "../../../models/joy-reactor/blog.interface";

@Component({
  selector: 'app-tag-index-pagination',
  templateUrl: './tag-index-pagination.component.html',
  styleUrls: ['./tag-index-pagination.component.css']
})
export class TagIndexPaginationComponent implements OnChanges {
  @Input() public tag: JRBlog;
  @Input() public type: FeedType;
  @Input() public lastPage: number;
  @Input() public page: number;

  public pages: number[];

  constructor() {
    this.tag = undefined!;
    this.type = undefined!;
    this.lastPage = undefined!;
    this.page = undefined!;

    this.pages = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.tag || !this.type || !this.lastPage || !this.page) return;

    this.pages = [];

    this.pages.push(this.page);
    for (let i = 1; i < 4; i++) {
      this.pages.push(this.page + i);
      this.pages.push(this.page - i);
    }

    this.pages = this.pages
      .filter(p => p < this.lastPage && p > 1)
      .sort((a, b) => b - a);
  }
}