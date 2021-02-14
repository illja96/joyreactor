import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ParserHttpService } from "./parser-http.service";

@Injectable({ providedIn: 'root' })
export class FeedHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService) { }

  public getAllLastPage(): Observable<number> {
    const url = `${environment.httpUri}/all`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parseLastPage(h)));
  }

  public getAll(page: number): Observable<number[]> {
    const url = `${environment.httpUri}/all/${page}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parsePostIds(h)));
  }

  public getBestLastPage(): Observable<number> {
    const url = `${environment.httpUri}/best`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parseLastPage(h)));
  }

  public getBest(page?: number): Observable<number[]> {
    const url = `${environment.httpUri}/best/${page}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parsePostIds(h)));
  }

  public getGoodLastPage(): Observable<number> {
    const url = `${environment.httpUri}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parseLastPage(h)));
  }

  public getGood(page?: number): Observable<number[]> {
    const url = `${environment.httpUri}/${page}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parsePostIds(h)));
  }
}