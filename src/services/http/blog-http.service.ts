import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ParserHttpService } from "./parser-http.service";
import { environment } from "../../environments/environment";
import { FeedPage } from "../../models/feed/feed-page.model";
import { JRBlog } from "../../models/joy-reactor/blog.interface";
import { FeedType } from "../../models/feed/feed-type.enum";
import { FeedTypeMapperService } from "../feed-type-mapper.service";

@Injectable({ providedIn: 'root' })
export class BlogHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService,
    private readonly feedTypeMapperService: FeedTypeMapperService) { }

  public getLastPage(blog: JRBlog, type: FeedType): Observable<number | null> {
    let url = `${environment.httpUri}/tag/${blog.tag}`;

    const feedUrlPart = this.feedTypeMapperService.mapToUrl(type);
    if (feedUrlPart) url += `/${feedUrlPart}`;

    return this.httpClient.get(url, { responseType: 'text', withCredentials: true })
      .pipe(map(html => this.parserHttpService.parseLastPage(html)));
  }

  public getAll(blog: JRBlog, type: FeedType, page: number): Observable<FeedPage> {
    let url = `${environment.httpUri}/tag/${blog.tag}`;

    const feedUrlPart = this.feedTypeMapperService.mapToUrl(type);
    if (feedUrlPart) url += `/${feedUrlPart}`;

    url += `/${page}`;

    return this.httpClient.get(url, { responseType: 'text', withCredentials: true })
      .pipe(map(html => ({
        page: page,
        lastPage: this.parserHttpService.parseLastPage(html),
        postIds: this.parserHttpService.parsePostIds(html)
      })));
  }
}