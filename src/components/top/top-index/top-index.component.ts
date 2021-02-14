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

  public maxWeek: number;
  public week: number;
  public minWeek: number;

  public posts: JRPost[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly topGqlService: TopGqlService,
    private readonly settingsService: SettingsService) {
    this.maxYear = undefined!;
    this.year = undefined!;
    this.minYear = undefined!;

    this.maxWeek = undefined!;
    this.week = undefined!;
    this.minWeek = undefined!;

    this.posts = undefined!;
  }

  public ngOnInit(): void {
    const maxYear = new Date().getFullYear();
    const minYear = 2009;

    const yearWeekObservable = this.route.paramMap
      .pipe(
        tap(() => this.posts = undefined!),
        map(paramMap => ({ year: paramMap.get('year'), week: paramMap.get('week') })),
        map(t => ({
          year: t.year !== null ? Number.parseInt(t.year) : null,
          week: t.week !== null ? Number.parseInt(t.week) : null
        })));

    yearWeekObservable
      .pipe(filter(t => t.year === null))
      .subscribe(() => this.router.navigateByUrl(`/top/year/${maxYear}`));

    yearWeekObservable
      .pipe(
        filter(t => t.year !== null && t.week === null),
        map(t => ({
          year: t.year!,
          week: t.year === maxYear ? DateHelper.getWeek(new Date()) - 2 : DateHelper.getTotalWeeks(t.year!)
        })))
      .subscribe(t => this.router.navigateByUrl(`/top/year/${t.year}/week/${t.week}`));

    yearWeekObservable
      .pipe(filter(t => t.year !== null && t.week !== null))
      .subscribe(t => {
        this.minWeek = t.year! <= 2009 ? 12 : 1;
        this.week = t.week!;
        this.maxWeek = t.year === maxYear ? DateHelper.getWeek(new Date()) - 2 : DateHelper.getTotalWeeks(t.year!);

        this.maxYear = maxYear;
        this.year = t.year!;
        this.minYear = minYear;
      });

    yearWeekObservable
      .pipe(
        filter(t => t.year !== null && t.week !== null),
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
}