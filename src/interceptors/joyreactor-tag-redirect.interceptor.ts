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

          const pathnameParts = requestUrl.pathname.split('/');

          let type: string | null = undefined!;

          const rawPageOrType = pathnameParts[pathnameParts.length - 1];
          const page = Number.parseInt(rawPageOrType);

          const lastPageRequest = Number.isNaN(page);
          if (lastPageRequest) {
            if (pathnameParts.length === 4) type = rawPageOrType;
            if (pathnameParts.length === 3) type = null
          } else {
            if (pathnameParts.length === 5) type = pathnameParts[pathnameParts.length - 2];
            if (pathnameParts.length === 4) type = null;
          }

          if (lastPageRequest && type === null) return of(e);

          let newUrl = redirectUrl.href;
          if (newUrl.endsWith('/')) newUrl = newUrl.slice(0, newUrl.length - 1);
          if (type !== null) newUrl += `/${type}`;
          if (!lastPageRequest) newUrl += `/${page}`;

          const newRequest = request.clone({ url: newUrl });
          return next.handle(newRequest);
        }));
  }
}