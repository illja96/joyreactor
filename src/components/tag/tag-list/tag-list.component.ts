import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { TagSortType } from "../../../models/tag/tag-sort-type.model";
import { JRBlog } from "../../../models/joy-reactor/blog.interface";
import { TagsPage } from "../../../models/tag/tags-page.model";
import { TagGqlService } from "../../../services/gql/tag-gql.service";
import { TagHttpService } from "../../../services/http/tag-http.service";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  public readonly tagSortType: typeof TagSortType;

  public tags: JRBlog[];
  public sortBy: TagSortType;

  public page: number;
  public lastPage: number;

  public nextPageLoading: boolean;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tagHttpService: TagHttpService,
    private readonly tagGqlService: TagGqlService) {
    this.tagSortType = TagSortType;

    this.tags = undefined!;
    this.sortBy = TagSortType.Rating;

    this.page = undefined!;
    this.lastPage = undefined!;

    this.nextPageLoading = false;
  }

  public ngOnInit(): void {
    const sortByPageObservable = this.route.paramMap
      .pipe(
        map(paramMap => ({ sortBy: paramMap.get('sortBy'), page: paramMap.get('page') })),
        map(t => ({
          sortBy: t.sortBy !== null ? <TagSortType>t.sortBy : null,
          page: t.page !== null ? Number.parseInt(t.page) : null
        })));

    sortByPageObservable
      .pipe(
        filter(t => t.sortBy === null),
        map(() => ({ sortBy: TagSortType.Rating })))
      .subscribe(t => this.router.navigateByUrl(`/tags/${t.sortBy}`));

    sortByPageObservable
      .pipe(
        filter(t => t.sortBy !== null && t.page === null),
        map(t => ({ sortBy: t.sortBy, page: 1 })))
      .subscribe(t => this.router.navigateByUrl(`/tags/${t.sortBy}/page/${t.page}`));

    sortByPageObservable
      .pipe(
        filter(t => t.sortBy !== null && t.page !== null),
        tap(() => this.tags = undefined!),
        tap(t => { this.sortBy = t.sortBy!; this.page = t.page!; }),
        switchMap(t => this.tagHttpService.getAll(t.page!, t.sortBy!)),
        tap(tagsPage => this.updatePagination(tagsPage)),
        switchMap(tagsPage => this.tagGqlService.getAll(tagsPage.tagIds)))
      .subscribe(tags => this.tags = tags);
  }

  public loadNextPage(): void {
    this.nextPageLoading = true;

    this.tagHttpService.getAll(this.page + 1, this.sortBy)
      .pipe(
        tap(tagPage => this.updatePagination(tagPage)),
        switchMap(tagPage => this.tagGqlService.getAll(tagPage.tagIds)),
        map(tags => tags.filter(t => this.tags.find(tt => tt.id === t.id) === undefined)))
      .subscribe(tags => {
        tags.forEach(t => this.tags.push(t));
        this.nextPageLoading = false;
      });
  }

  private updatePagination(tagsPage: TagsPage): void {
    this.lastPage = tagsPage.lastPage;
    this.page = tagsPage.page;
  }
}