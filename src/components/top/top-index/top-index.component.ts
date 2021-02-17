import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { TopGqlService } from "../../../services/gql/top-gql.service";
import { DateHelper } from "../../../helpers/date.helper";
import { TopType } from "../../../models/feed/top-type.enum";

@Component({
  selector: 'app-top-index',
  templateUrl: './top-index.component.html',
  styleUrls: ['./top-index.component.css']
})
export class TopIndexComponent implements OnInit {
  public readonly topTypes: typeof TopType;

  public type: TopType;

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
    private readonly topGqlService: TopGqlService) {
    this.topTypes = TopType;
    
    this.type = undefined!;

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
        map(paramMap => ({ type: paramMap.get('type'), year: paramMap.get('year'), week: paramMap.get('week') })),
        map(t => ({
          type: t.type !== null ? <TopType>t.type : null,
          year: t.year !== null ? Number.parseInt(t.year) : null,
          week: t.week !== null ? Number.parseInt(t.week) : null
        })));

    yearWeekObservable
      .pipe(
        filter(t => t.type === null),
        map(() => ({ type: TopType.OnlySWF })))
      .subscribe(t => this.router.navigateByUrl(`/top/${t.type}`, { skipLocationChange: true }));

    yearWeekObservable
      .pipe(
        filter(t => t.type !== null && t.year === null),
        map(t => ({ type: t.type!, year: maxYear })))
      .subscribe(t => this.router.navigateByUrl(`/top/${t.type}/year/${t.year}`, { skipLocationChange: true }));

    yearWeekObservable
      .pipe(
        filter(t => t.type !== null && t.year !== null && t.week === null),
        map(t => ({
          type: t.type!,
          year: t.year!,
          week: t.year === maxYear ? DateHelper.getWeek(new Date()) - 2 : DateHelper.getTotalWeeks(t.year!)
        })))
      .subscribe(t => this.router.navigateByUrl(`/top/${t.type}/year/${t.year}/week/${t.week}`));

    yearWeekObservable
      .pipe(
        filter(t => t.type !== null && t.year !== null && t.week !== null),
        tap(() => this.posts = undefined!),
        tap(t => {
          this.type = t.type!;

          this.minWeek = t.year! <= 2009 ? 12 : 1;
          this.week = t.week!;
          this.maxWeek = t.year === maxYear ? DateHelper.getWeek(new Date()) - 2 : DateHelper.getTotalWeeks(t.year!);

          this.maxYear = maxYear;
          this.year = t.year!;
          this.minYear = minYear;
        }),
        switchMap(t => this.topGqlService.getByWeek(t.type!, t.year!, t.week!)))
      .subscribe(p => this.posts = p);
  }
}