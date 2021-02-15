import { Component, Input, OnInit } from "@angular/core";
import { FeedType } from "../../../models/feed/feed-type.enum";

@Component({
  selector: 'app-feed-pagination',
  templateUrl: './feed-pagination.component.html',
  styleUrls: ['./feed-pagination.component.css']
})
export class FeedPaginationComponent implements OnInit {
  public pages: number[];

  @Input() public type: FeedType;
  @Input() public lastPage: number;
  @Input() public page: number;

  constructor() {
    this.pages = undefined!;

    this.type = undefined!;
    this.lastPage = undefined!;
    this.page = undefined!;
  }

  public ngOnInit(): void {
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