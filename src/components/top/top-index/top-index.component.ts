import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, tap } from "rxjs/operators";
import { SettingsService } from "../../../services/settings.service";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { TopService } from "../../../services/top.service";
import { DateHelper } from "../../../helpers/date.helper";

@Component({
  selector: 'app-top-index',
  templateUrl: './top-index.component.html',
  styleUrls: ['./top-index.component.css']
})
export class TopIndexComponent implements OnInit {
  public readonly maxYear: number;
  public readonly minYear: number;
  public readonly years: number[];
  public year: number;

  public maxWeek: number;
  public minWeek: number;
  public weeks: number[];
  public week: number;

  public posts: JRPost[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly topService: TopService,
    private readonly settingsService: SettingsService) {
    this.year = undefined!;
    this.maxYear = new Date().getFullYear();
    this.minYear = 2009;
    this.years = [];
    for (let y = this.maxYear - 1; y > this.minYear; y--) this.years.push(y);

    this.week = undefined!;
    this.maxWeek = undefined!;
    this.weeks = [];
    this.minWeek = undefined!;

    this.posts = undefined!;
  }

  public ngOnInit(): void {
    const rawYear = this.route.snapshot.paramMap.get('year');
    if (rawYear === null) {
      this.router.navigateByUrl(`/top/year/${this.maxYear}`);
      return;
    }
    this.year = Number.parseInt(rawYear);

    this.maxWeek = this.year === this.maxYear ? DateHelper.getWeek(new Date()) : DateHelper.getTotalWeeks(this.year);
    this.minWeek = this.year <= 2009 ? 12 : 1;
    for (let w = this.maxWeek - 1; w > this.minWeek; w--) this.weeks.push(w);

    const rawWeek = this.route.snapshot.paramMap.get('week');
    if (rawWeek === null) {
      this.router.navigateByUrl(`/top/year/${this.year}/week/${this.maxWeek}`);
      return;
    }
    this.week = Number.parseInt(rawWeek);

    this.settingsService.getNsfw()
      .pipe(
        tap(() => this.posts = undefined!),
        switchMap(nsfw => this.topService.getByWeek(this.year, this.week, nsfw)))
      .subscribe(p => this.posts = p);
  }
}