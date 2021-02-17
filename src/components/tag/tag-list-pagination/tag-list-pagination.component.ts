import { Component, Input, OnChanges } from "@angular/core";
import { TagSortType } from "../../../models/tag/tag-sort-type.enum";

@Component({
  selector: 'app-tag-list-pagination',
  templateUrl: './tag-list-pagination.component.html',
  styleUrls: ['./tag-list-pagination.component.css']
})
export class TagListPaginationComponent implements OnChanges {
  @Input() public sortBy: TagSortType;
  @Input() public page: number;
  @Input() public maxPage: number;

  public minPage: number;
  public pages: number[];

  constructor() {
    this.sortBy = undefined!;
    this.page = undefined!;
    this.maxPage = undefined!;

    this.minPage = 1;
    this.pages = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.sortBy || !this.page || !this.maxPage) return;

    this.pages = [];

    this.pages.push(this.page);
    for (let i = 1; i < 3; i++) {
      this.pages.push(this.page + i);
      this.pages.push(this.page - i);
    }

    this.pages = this.pages
      .filter(y => y < this.maxPage && y > this.minPage)
      .sort((a, b) => a - b);
  }
}