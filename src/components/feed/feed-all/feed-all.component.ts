import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { PostGqlService } from "../../../services/gql/post-gql.service";
import { FeedHttpService } from "../../../services/http/feed-http.service";

@Component({
  selector: 'app-feed-all',
  templateUrl: './feed-all.component.html',
  styleUrls: ['./feed-all.component.css']
})
export class FeedAllComponent implements OnInit {
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
        switchMap(() => this.feedHttpService.getAllLastPage()))
      .subscribe(page => this.router.navigateByUrl(`/feed/all/${page}`));

    pageObservable
      .pipe(
        filter(page => page !== undefined),
        tap(page => this.lastPage = page!),
        switchMap(page => this.feedHttpService.getAll(page!)),
        switchMap(postIds => this.postGqlService.getAll(postIds)))
      .subscribe(posts => this.posts = posts);
  }
}
