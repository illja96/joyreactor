import { AfterContentChecked, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { BlogGqlService } from "../../../services/gql/blog-gql.service";
import { BlogHttpService } from "../../../services/http/blog-http.service";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { JRBlog } from "../../../models/joy-reactor/blog.interface";
import { FeedPage } from "../../../models/feed/feed-page.model";
import { PostGqlService } from "../../../services/gql/post-gql.service";
import { FeedType } from "../../../models/feed/feed-type.enum";

@Component({
  selector: 'app-tag-index',
  templateUrl: './tag-index.component.html',
  styleUrls: ['./tag-index.component.css']
})
export class TagIndexComponent implements OnInit, AfterContentChecked {
  public tag: JRBlog;
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
    private readonly blogHttpService: BlogHttpService,
    private readonly blogGqlService: BlogGqlService,
    private readonly postGqlService: PostGqlService) {
    this.tag = undefined!;
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
        map(paramMap => paramMap.get('id')),
        map(id => Number.parseInt(id!)),
        switchMap(id => this.blogGqlService.get(id!)),
        tap(tag => this.tag = tag),
        switchMap(() => this.route.paramMap),
        map(paramMap => ({ type: paramMap.get('type'), page: paramMap.get('page') })),
        map(t => ({
          type: t.type !== null ? <FeedType>t.type : null,
          page: t.page !== null ? Number.parseInt(t.page) : null
        })));

    typePageObservable
      .pipe(
        filter(t => t.type === null),
        map(() => ({ type: FeedType.good })))
      .subscribe(t => this.router.navigateByUrl(`/tag/${this.tag.id}/${t.type}`, { skipLocationChange: true }));

    typePageObservable
      .pipe(
        filter(t => t.type !== null && t.page === null),
        tap(t => this.type = t.type!),
        switchMap(() => this.blogHttpService.getLastPage(this.tag, this.type)),
        tap(page => this.lastPage = page),
        filter(page => page !== null))
      .subscribe(() => this.router.navigateByUrl(`/tag/${this.tag.id}/${this.type}/${this.lastPage}`));

    typePageObservable
      .pipe(
        filter(t => t.type !== null && t.page !== null),
        tap(() => this.posts = undefined!),
        tap(t => this.type = t.type!),
        tap(t => this.page = t.page!),
        switchMap(() => this.blogHttpService.getAll(this.tag, this.type, this.page)),
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

    this.blogHttpService.getAll(this.tag, this.type, this.page - 1)
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