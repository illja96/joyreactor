import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { FeedType } from "../../../models/feed/feed-type.enum";
import { FeedPage } from "../../../models/feed/feed-page.mode";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { PostGqlService } from "../../../services/gql/post-gql.service";
import { FeedHttpService } from "../../../services/http/feed-http.service";

@Component({
  selector: 'app-feed-index',
  templateUrl: './feed-index.component.html',
  styleUrls: ['./feed-index.component.css']
})
export class FeedIndexComponent implements OnInit {
  public type: FeedType;
  public posts: JRPost[];

  public lastPage: number;
  public page: number;

  public nextPageLoading: boolean;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly feedHttpService: FeedHttpService,
    private readonly postGqlService: PostGqlService) {
    this.type = undefined!;
    this.posts = undefined!;

    this.lastPage = undefined!;
    this.page = undefined!;

    this.nextPageLoading = false;
  }

  public ngOnInit(): void {
    const typePageObservable = this.route.paramMap
      .pipe(
        map(paramMap => ({ type: paramMap.get('type'), page: paramMap.get('page') })),
        map(t => ({
          type: t.type !== null ? <FeedType>t.type : null,
          page: t.page !== null ? Number.parseInt(t.page) : null
        })));

    typePageObservable
      .pipe(filter(t => t.type === null))
      .subscribe(() => this.router.navigateByUrl(`/feed/${FeedType.Good}`));

    typePageObservable
      .pipe(
        filter(t => t.type !== null && t.page === null),
        tap(t => this.type = t.type!),
        switchMap(t => this.feedHttpService.getLastPage(t.type!)))
      .subscribe(page => this.router.navigateByUrl(`/feed/${this.type}/page/${page}`));

    typePageObservable
      .pipe(
        filter(t => t.type !== null && t.page !== null),
        tap(t => { this.type = t.type!; this.posts = undefined!; }),
        switchMap(t => this.feedHttpService.getAll(t.type!, t.page!)),
        tap(feedPage => this.updatePagination(feedPage)),
        switchMap(feedPage => this.postGqlService.getAll(feedPage.postIds)))
      .subscribe(posts => this.posts = posts);
  }

  public loadNextPage(): void {
    this.nextPageLoading = true;

    this.feedHttpService.getAll(this.type, this.page - 1)
      .pipe(
        tap(feedPage => this.updatePagination(feedPage)),
        switchMap(feedPage => this.postGqlService.getAll(feedPage.postIds)))
      .subscribe(posts => {
        posts.forEach(p => this.posts.push(p));
        this.nextPageLoading = false;
      });
  }

  private updatePagination(feedPage: FeedPage): void {
    this.lastPage = feedPage.lastPage;
    this.page = feedPage.page;
  }
}
