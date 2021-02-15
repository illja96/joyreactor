import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { gqlFragmentsConstants } from "src/constants/gql/gql-fragments.constants";
import { JRBlog } from "../../models/joy-reactor/blog.interface";
import { ParserGqlService } from "./parser-gql.service";

@Injectable({ providedIn: 'root' })
export class TagGqlService {
  constructor(
    private readonly apollo: Apollo,
    private readonly parserGqlService: ParserGqlService) { }

  public getAll(ids: number[]): Observable<JRBlog[]> {
    const encodedIds = ids
      .map(id => `Blog:${id}`)
      .map(id => btoa(id));

    let variables: any = {};
    for (let i = 0; i < ids.length; i++) {
      variables[`id${i}`] = encodedIds[i];
    }

    const queryParameters = ids
      .map((id, i) => `$id${i}: ID!`)
      .join(',');

    const queries = ids
      .map((id, i) => `blog${i}:node(id: $id${i}) { ...BlogFields }`)
      .join('\n');

    const query = gql`
    query blogs(${queryParameters}) {
      ${queries}
    }
    ${gqlFragmentsConstants.blog}`;

    return this.apollo.query<any>({ query: query, variables: variables })
      .pipe(
        map(qr => ids.map((id, i) => qr.data[`blog${i}`])),
        map(blogs => blogs.map(p => this.parserGqlService.parseBlog(p))));
  }
}