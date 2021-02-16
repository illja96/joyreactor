import { Component, Input, OnChanges } from "@angular/core";
import { FeedType } from "../../../models/feed/feed-type.enum";

@Component({
  selector: 'app-feed-index-pagination',
  templateUrl: './feed-index-pagination.component.html',
  styleUrls: ['./feed-index-pagination.component.css']
})
export class FeedIndexPaginationComponent implements OnChanges {
  @Input() public type: FeedType;
  @Input() public lastPage: number;
  @Input() public page: number;

  public pages: number[];

  constructor() {
    this.type = undefined!;
    this.lastPage = undefined!;
    this.page = undefined!;

    this.pages = undefined!;
  }

  public ngOnChanges(): void {
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