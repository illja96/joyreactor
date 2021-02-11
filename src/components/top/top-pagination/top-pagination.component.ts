import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-pagination',
  templateUrl: './top-pagination.component.html',
  styleUrls: ['./top-pagination.component.css']
})
export class TopPaginationComponent {
  @Input() public maxYear: number;
  @Input() public year: number;
  @Input() public minYear: number;
  @Input() public years: number[];

  @Input() public maxWeek: number;
  @Input() public week: number;
  @Input() public minWeek: number;
  @Input() public weeks: number[];

  constructor() {
    this.maxYear = undefined!;
    this.year = undefined!;
    this.minYear = undefined!;
    this.years = undefined!;

    this.maxWeek = undefined!;
    this.week = undefined!;
    this.minWeek = undefined!;
    this.weeks = undefined!;
  }
}
