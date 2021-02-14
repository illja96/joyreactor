import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { ParserHttpService } from "./http/parser-http.service";
import { environment } from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private headerSubject: BehaviorSubject<string>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService) {
    this.headerSubject = new BehaviorSubject<string>(undefined!);

    this.httpClient.get(environment.httpUri, { responseType: 'text' })
      .pipe(map(html => this.parserHttpService.parseHeader(html)))
      .subscribe(header => this.headerSubject.next(header));
  }

  public get(): Observable<string> {
    return this.headerSubject;
  }
}