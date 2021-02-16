import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ParserHttpService } from "./parser-http.service";
import { environment } from "../../environments/environment";
import { FeedPage } from "../../models/feed/feed-page.model";
import { JRBlog } from "../../models/joy-reactor/blog.interface";

@Injectable({ providedIn: 'root' })
export class BlogHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService) { }

  public getLastPage(blog: JRBlog): Observable<number | null> {
    const url = `${environment.httpUri}/tag/${blog.tag}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(html => this.parserHttpService.parseLastPage(html)));
  }

  public getAll(blog: JRBlog, page: number): Observable<FeedPage> {
    const url = `${environment.httpUri}/tag/${blog.tag}/${page}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(html => ({
        page: page,
        lastPage: this.parserHttpService.parseLastPage(html),
        postIds: this.parserHttpService.parsePostIds(html)
      })));
  }
}