import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, switchMap, tap } from "rxjs/operators";
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
  public tags: JRBlog[];

  public page: number;
  public lastPage: number;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tagHttpService: TagHttpService,
    private readonly tagGqlService: TagGqlService) {
    this.tags = undefined!;

    this.page = undefined!;
    this.lastPage = undefined!;
  }

  public ngOnInit(): void {
    const pageObservable = this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('page')),
        map(page => page !== null ? Number.parseInt(page) : null));

    pageObservable
      .pipe(filter(page => page === null))
      .subscribe(() => this.router.navigateByUrl('/tags/page/1'));

    pageObservable
      .pipe(
        filter(page => page !== null),
        tap(page => this.page = page!),
        switchMap(page => this.tagHttpService.getAll(page!)),
        tap(tagsPage => this.updatePagination(tagsPage)),
        switchMap(tagsPage => this.tagGqlService.getAll(tagsPage.tagIds)))
      .subscribe(tags => this.tags = tags);
  }

  private updatePagination(tagsPage: TagsPage): void {
    this.lastPage = tagsPage.lastPage;
    this.page = tagsPage.page;
  }
}