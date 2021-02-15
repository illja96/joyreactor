import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FeedPage } from "../../models/feed/feed-page.model";
import { environment } from "../../environments/environment";
import { ParserHttpService } from "./parser-http.service";
import { FeedType } from "../../models/feed/feed-type.enum";

@Injectable({ providedIn: 'root' })
export class FeedHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService) { }

  public getLastPage(type: FeedType): Observable<number> {
    const url = `${this.getBaseUrl(type)}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parseLastPage(h)));
  }

  public getAll(type: FeedType, page: number): Observable<FeedPage> {
    const url = `${this.getBaseUrl(type)}/${page}`;

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

  private getBaseUrl(type: FeedType): string {
    switch (type) {
      case FeedType.All:
        return `${environment.httpUri}/all`;
      case FeedType.Best:
        return `${environment.httpUri}/best`;
      case FeedType.Good:
        return `${environment.httpUri}`;
    }
  }
}