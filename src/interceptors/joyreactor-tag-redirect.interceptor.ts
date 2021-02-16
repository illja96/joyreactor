import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable()
export class JoyreactorTagRedirectInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isJoyreactor = request.url.startsWith(environment.httpUri);
    if (!isJoyreactor) return next.handle(request);

    return next.handle(request)
      .pipe(
        switchMap(e => {
          if (!(e instanceof HttpResponse)) return of(e);

          const requestUrl = new URL(request.url);

          const isTagRequest = requestUrl.pathname.startsWith('/tag');
          if (!isTagRequest) return of(e);

          const redirectUrl = new URL(e.url!);

          const isNoRedirect = redirectUrl.origin === environment.httpUri;
          if (isNoRedirect) return of(e);

          const isTagPageRequest = requestUrl.pathname.split('/').length === 3;
          if (isTagPageRequest) return of(e);

          const pathnameParts = requestUrl.pathname.split('/');
          const rawPage = pathnameParts[pathnameParts.length - 1];
          const page = Number.parseInt(rawPage);

          const newRequest = request.clone({ url: `${redirectUrl.href}/${page}` });
          return next.handle(newRequest);
        }));
  }
}