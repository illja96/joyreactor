import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FeedPage } from "../../models/feed/feed-page.model";
import { environment } from "../../environments/environment";
import { ParserHttpService } from "./parser-http.service";
import { FeedType } from "../../models/feed/feed-type.enum";
import { FeedTypeMapperService } from "../feed-type-mapper.service";

@Injectable({ providedIn: 'root' })
export class FeedHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService,
    private readonly feedTypeMapperService: FeedTypeMapperService) { }

  public getLastPage(type: FeedType): Observable<number | null> {
    let url = environment.httpUri;

    const feedUrlPart = this.feedTypeMapperService.mapToUrl(type);
    if (feedUrlPart) url += `/${feedUrlPart}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parseLastPage(h)));
  }

  public getAll(type: FeedType, page: number): Observable<FeedPage> {
    let url = environment.httpUri;

    const feedUrlPart = this.feedTypeMapperService.mapToUrl(type);
    if (feedUrlPart) url += `/${feedUrlPart}`;

    url += `/${page}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(html => {
        const feedPage: FeedPage = {
          page: page,
          lastPage: this.parserHttpService.parseLastPage(html),
          postIds: this.parserHttpService.parsePostIds(html)
        };

        return feedPage;
      }));
  }
}