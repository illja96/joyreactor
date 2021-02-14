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

  public getAll(page?: number): Observable<number[]> {
    const url = page ?
      `${environment.httpUri}/all/${page}` :
      `${environment.httpUri}/all`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parsePostIds(h)));
  }

  public getBest(page?: number): Observable<number[]> {
    const url = page ?
      `${environment.httpUri}/best/${page}` :
      `${environment.httpUri}/best`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parsePostIds(h)));
  }

  public getGood(page?: number): Observable<number[]> {
    const url = page ?
      `${environment.httpUri}/${page}` :
      `${environment.httpUri}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(h => this.parserHttpService.parsePostIds(h)));
  }
}