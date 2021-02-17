import { AfterContentChecked, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { FeedType } from "../../../models/feed/feed-type.enum";
import { FeedPage } from "../../../models/feed/feed-page.model";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { PostGqlService } from "../../../services/gql/post-gql.service";
import { FeedHttpService } from "../../../services/http/feed-http.service";

@Component({
  selector: 'app-feed-index',
  templateUrl: './feed-index.component.html',
  styleUrls: ['./feed-index.component.css']
})
export class FeedIndexComponent implements OnInit, AfterContentChecked {
  public type: FeedType;
  public posts: JRPost[];

  public lastPage: number | null;
  public page: number;

  public nextPageLoading: boolean;

  private fragment: string;
  private fragmentApplied: boolean;

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

    this.fragment = undefined!;
    this.fragmentApplied = false;
  }

  public ngOnInit(): void {
    this.route.fragment.subscribe(fragment => this.fragment = fragment);

    const typePageObservable = this.route.paramMap
      .pipe(
        map(paramMap => ({ type: paramMap.get('type'), page: paramMap.get('page') })),
        map(t => ({
          type: t.type !== null ? <FeedType>t.type : null,
          page: t.page !== null ? Number.parseInt(t.page) : null
        })));

    typePageObservable
      .pipe(
        filter(t => t.type === null),
        map(() => ({ type: FeedType.good })))
      .subscribe(t => this.router.navigateByUrl(`/feed/${t.type}`, { skipLocationChange: true }));

    typePageObservable
      .pipe(
        filter(t => t.type !== null && t.page === null),
        tap(t => this.type = t.type!),
        switchMap(t => this.feedHttpService.getLastPage(t.type!)),
        tap(page => this.lastPage = page),
        filter(page => page !== null))
      .subscribe(page => this.router.navigateByUrl(`/feed/${this.type}/${page}`));

    typePageObservable
      .pipe(
        filter(t => t.type !== null && t.page !== null),
        tap(t => { this.type = t.type!; this.posts = undefined!; }),
        switchMap(t => this.feedHttpService.getAll(t.type!, t.page!)),
        tap(feedPage => this.updatePagination(feedPage)),
        switchMap(feedPage => this.postGqlService.getAll(feedPage.postIds)))
      .subscribe(posts => this.posts = posts);
  }

  public ngAfterContentChecked(): void {
    if (this.fragmentApplied) return;
    if (!this.posts) return;

    const fragmentElement = document.getElementById(this.fragment);
    if (!fragmentElement) return;

    fragmentElement.scrollIntoView();
    this.fragmentApplied = true;
  }

  public loadNextPage(): void {
    this.nextPageLoading = true;

    this.feedHttpService.getAll(this.type, this.page - 1)
      .pipe(
        tap(feedPage => this.updatePagination(feedPage)),
        switchMap(feedPage => this.postGqlService.getAll(feedPage.postIds)),
        map(posts => posts.filter(p => this.posts.find(pp => pp.id === p.id) === undefined)))
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