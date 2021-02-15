import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ParserHttpService } from "./parser-http.service";
import { TagsPage } from "../../models/tag/tags-page.model";

@Injectable({ providedIn: 'root' })
export class TagHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService) { }

  public getAll(page: number): Observable<TagsPage> {
    const url = page >= 1 ?
      `${environment.httpUri}/tags` :
      `${environment.httpUri}/tags/${page}`;

    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(map(html => ({
        page: page,
        lastPage: this.parserHttpService.parseFirstPage(html),
        tagIds: this.parserHttpService.parseTagIds(html)
      })));
  }
}