import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, skip, switchMap, tap } from "rxjs/operators";
import { SettingsService } from "../../../services/settings.service";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { TopGqlService } from "../../../services/gql/top-gql.service";
import { DateHelper } from "../../../helpers/date.helper";

@Component({
  selector: 'app-top-index',
  templateUrl: './top-index.component.html',
  styleUrls: ['./top-index.component.css']
})
export class TopIndexComponent implements OnInit {
  public maxYear: number;
  public year: number;
  public minYear: number;
  public years: number[];

  public maxWeek: number;
  public week: number;
  public minWeek: number;
  public weeks: number[];

  public posts: JRPost[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly topGqlService: TopGqlService,
    private readonly settingsService: SettingsService) {
    this.maxYear = undefined!;
    this.year = undefined!;
    this.minYear = undefined!;
    this.years = undefined!;

    this.maxWeek = undefined!;
    this.week = undefined!;
    this.minWeek = undefined!;
    this.weeks = undefined!;

    this.posts = undefined!;
  }

  public ngOnInit(): void {
    const yearWeekChangeObservable = this.route.paramMap
      .pipe(
        tap(() => this.posts = undefined!),
        map(pm => {
          const rawYear = pm.get('year');
          const rawWeek = pm.get('week');
          return ({ rawYear, rawWeek });
        }),
        map(t => {
          const maxYear = new Date().getFullYear();
          const minYear = 2009;

          if (t.rawYear === null) {
            this.router.navigateByUrl(`/top/year/${maxYear}`);
            return;
          }

          const year = Number.parseInt(t.rawYear);
          const years = this.getYearsRange(year, minYear, maxYear);

          const maxWeek = year === maxYear ? DateHelper.getWeek(new Date()) - 2 : DateHelper.getTotalWeeks(year);
          const minWeek = year <= 2009 ? 12 : 1;

          if (t.rawWeek === null) {
            this.router.navigateByUrl(`/top/year/${year}/week/${maxWeek}`);
            return;
          }

          const week = Number.parseInt(t.rawWeek);
          const weeks = this.getWeeksRange(week, minWeek, maxWeek);

          return ({ maxYear, year, minYear, years, maxWeek, week, minWeek, weeks });
        }),
        filter(t => t !== undefined));

    yearWeekChangeObservable
      .subscribe(t => {
        this.maxYear = t!.maxYear;
        this.year = t!.year;
        this.minYear = t!.minYear;
        this.years = t!.years;

        this.maxWeek = t!.maxWeek;
        this.week = t!.week;
        this.minWeek = t!.minWeek;
        this.weeks = t!.weeks;
      });

    yearWeekChangeObservable
      .pipe(
        tap(() => this.posts = undefined!),
        switchMap(() => this.settingsService.getNsfw()),
        switchMap(nsfw => this.topGqlService.getByWeek(this.year, this.week, nsfw)))
      .subscribe(p => this.posts = p)

    this.settingsService.getNsfw()
      .pipe(
        skip(1),
        filter(() => this.year !== undefined && this.week !== undefined),
        tap(() => this.posts = undefined!),
        switchMap(nsfw => this.topGqlService.getByWeek(this.year, this.week, nsfw)))
      .subscribe(p => this.posts = p);
  }

  private getYearsRange(year: number, minYear: number, maxYear: number): number[] {
    const years = [];

    years.push(year);
    for (let i = 1; i < 3; i++) {
      years.push(year + i);
      years.push(year - i);
    }

    return years
      .filter(y => y < maxYear && y > minYear)
      .sort((a, b) => b - a);
  }

  private getWeeksRange(week: number, minWeek: number, maxWeek: number): number[] {
    const weeks = [];

    weeks.push(week);
    for (let i = 1; i < 5; i++) {
      weeks.push(week + i);
      weeks.push(week - i);
    }

    return weeks
      .filter(w => w < maxWeek && w > minWeek)
      .sort((a, b) => b - a);
  }
}