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

  public getLastPage(type: FeedType): Observable<number | null> {
    let url = environment.httpUri;

    const feedUrlPart = this.mapToUrl(type);
    if (feedUrlPart) url += `/${feedUrlPart}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parseLastPage(h)));
  }

  public getAll(type: FeedType, page: number): Observable<FeedPage> {
    let url = environment.httpUri;

    const feedUrlPart = this.mapToUrl(type);
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

  private mapToUrl(type: FeedType): string | null {
    switch (type) {
      case FeedType.new:
        return 'new';
      case FeedType.all:
        return 'all';
      case FeedType.good:
        return null;
      case FeedType.best:
        return 'best';
      default:
        throw new Error('Invalid feed type');
    }
  }
}