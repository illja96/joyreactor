import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-pagination',
  templateUrl: './feed-pagination.component.html',
  styleUrls: ['./feed-pagination.component.css']
})
export class FeedPaginationComponent {
  @Input() public type: string;

  @Input() public set lastPage(value: number) {
    this._lastPage = value;
    this.updatePages();
  };
  public get lastPage(): number {
    return this._lastPage;
  }

  @Input() public set page(value: number) {
    this._page = value;
    this.updatePages();
  }
  public get page(): number {
    return this._page;
  }
  
  public pages: number[];

  private _lastPage: number;
  private _page: number;

  constructor() {
    this.type = undefined!;
    this.pages = undefined!;

    this._lastPage = undefined!;
    this._page = undefined!;    
  }

  private updatePages(): void {
    if (this.lastPage === undefined && this.page === undefined) return;

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
