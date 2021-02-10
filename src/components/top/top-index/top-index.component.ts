import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SettingsService } from "../../../services/settings.service";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { TopService } from "../../../services/top.service";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-top-index',
  templateUrl: './top-index.component.html',
  styleUrls: ['./top-index.component.css']
})
export class TopIndexComponent implements OnInit {
  public year: number;
  public week: number;

  public posts: JRPost[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly topService: TopService,
    private readonly settingsService: SettingsService) {
    this.year = 0;
    this.week = 0;
    this.posts = undefined!;
  }

  public ngOnInit(): void {
    const rawYear = this.route.snapshot.paramMap.get('year');
    const rawWeek = this.route.snapshot.paramMap.get('week');

    if (rawYear == null || rawWeek == null) {
      const year = new Date().getFullYear();
      const week = 1;

      this.router.navigateByUrl(`/top/year/${year}/week/${week}`);
      return;
    }

    this.year = Number.parseInt(rawYear);
    this.week = Number.parseInt(rawWeek);

    this.settingsService.getNsfw()
      .pipe(
        tap(() => this.posts = undefined!),
        switchMap(nsfw => this.topService.getByWeek(this.year, this.week, nsfw)))
      .subscribe(p => this.posts = p);

    // this.posts.push({
    //   id: 1,
    //   text: 'Hi',
    //   attributes: [],
    //   rating: 10.288,
    //   commentsCount: 5,
    //   createdAt: new Date(),
    //   nsfw: true,
    //   user: {
    //     id: 123124,
    //     username: 'test',
    //   },
    //   blogs: [
    //     {
    //       id: 14141,
    //       tag: 'test',
    //       name: 'test',
    //       synonyms: 'test'
    //     }
    //   ],
    //   bestComments: [],
    //   comments: []
    // });
  }
}