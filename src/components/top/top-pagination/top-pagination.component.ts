import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: 'app-top-pagination',
  templateUrl: './top-pagination.component.html',
  styleUrls: ['./top-pagination.component.css']
})
export class TopPaginationComponent implements OnInit, OnChanges {
  @Input() public maxYear: number;
  @Input() public year: number;
  @Input() public minYear: number;
  public years: number[];

  @Input() public maxWeek: number;
  @Input() public week: number;
  @Input() public minWeek: number;
  public weeks: number[];

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

  public ngOnInit(): void {
    this.update();
  }

  public ngOnChanges(): void {
    this.update();
  }

  public update(): void {
    this.years = [];
    this.weeks = [];

    this.years.push(this.year);
    for (let i = 1; i < 3; i++) {
      this.years.push(this.year + i);
      this.years.push(this.year - i);
    }

    this.weeks.push(this.week);
    for (let i = 1; i < 5; i++) {
      this.weeks.push(this.week + i);
      this.weeks.push(this.week - i);
    }

    this.years = this.years
      .filter(y => y < this.maxYear && y > this.minYear)
      .sort((a, b) => b - a);

    this.weeks = this.weeks
      .filter(w => w < this.maxWeek && w > this.minWeek)
      .sort((a, b) => b - a);
  }
}
