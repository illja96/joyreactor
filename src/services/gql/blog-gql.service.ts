import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { gqlBlogConstants } from "../../constants/gql/gql-blog.constants";
import { JRBlog } from "../../models/joy-reactor/blog.interface";
import { ParserGqlService } from "./parser-gql.service";

@Injectable({ providedIn: 'root' })
export class BlogGqlService {
  constructor(
    private readonly apollo: Apollo,
    private readonly parserGqlService: ParserGqlService) { }

  public get(id: number): Observable<JRBlog> {
    const encodedId = btoa(`Blog:${id}`);
    const variables = {
      id: encodedId
    };

    return this.apollo.query<any>({ query: gqlBlogConstants.blog, variables: variables })
      .pipe(
        map(qr => qr.data.blog),
        map(blog => this.parserGqlService.parseBlog(blog)));
  }
}