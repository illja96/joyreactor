import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { JRPost } from '../../../models/joy-reactor/post.interface';
import { PostGqlService } from '../../../services/gql/post-gql.service';
import { FeedHttpService } from '../../../services/http/feed-http.service';

@Component({
  selector: 'app-feed-good',
  templateUrl: './feed-good.component.html',
  styleUrls: ['./feed-good.component.css']
})
export class FeedGoodComponent implements OnInit {
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
        switchMap(() => this.feedHttpService.getGoodLastPage()))
      .subscribe(page => this.router.navigateByUrl(`/feed/good/${page}`));

    pageObservable
      .pipe(
        filter(page => page !== undefined),
        tap(page => this.lastPage = page!),
        switchMap(page => this.feedHttpService.getGood(page!)),
        switchMap(postIds => this.postGqlService.getAll(postIds)))
      .subscribe(posts => this.posts = posts);
  }
}
