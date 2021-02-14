import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { PostGqlService } from "../../../services/gql/post-gql.service";
import { FeedHttpService } from "../../../services/http/feed-http.service";

@Component({
  selector: 'app-feed-best',
  templateUrl: './feed-best.component.html',
  styleUrls: ['./feed-best.component.css']
})
export class FeedBestComponent implements OnInit {
  public posts: JRPost[];
  public lastPage: number;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly feedHttpService: FeedHttpService,
    private readonly postGqlService: PostGqlService) {
      this.posts = undefined!;
      this.lastPage = undefined!;
    }

  public ngOnInit(): void {
    const pageObservable = this.route.paramMap
      .pipe(
        map(paramMap => {
          const isPaged = paramMap.has('page');
          if (!isPaged) return undefined;

          const rawPage = paramMap.get('page')!;
          return Number.parseInt(rawPage);
        }));

    pageObservable
      .pipe(
        filter(page => page === undefined),
        switchMap(() => this.feedHttpService.getBestLastPage()))
      .subscribe(page => this.router.navigateByUrl(`/feed/best/${page}`));

    pageObservable
      .pipe(
        filter(page => page !== undefined),
        tap(page => this.lastPage = page!),
        switchMap(page => this.feedHttpService.getBest(page!)),
        switchMap(postIds => this.postGqlService.getAll(postIds)))
      .subscribe(posts => this.posts = posts);
  }
}
