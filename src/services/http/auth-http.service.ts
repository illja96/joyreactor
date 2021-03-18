import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ParserHttpService } from "./parser-http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly parserHttpService: ParserHttpService) { }

  public login(username: string, password: string): Observable<any> {
    const url = `${environment.httpUri}/login`;

    return this.httpClient.get(url, { responseType: 'text', withCredentials: true })
      .pipe(
        map((html) => this.parserHttpService.parseCsrfToken(html)),
        map((csrfToken) => ({
          'signin[username]': username,
          'signin[password]': password,
          'signin[_csrf_token]': csrfToken
        })),
        switchMap((body) => this.httpClient.post(url, body, { withCredentials: true }))
      );
  }

  public logout(): Observable<any> {
    const url = `${environment.httpUri}/logout`;

    return this.httpClient.get(url, { withCredentials: true });
  }
}