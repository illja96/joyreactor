import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { gqlFragmentsConstants } from "../../constants/gql/gql-fragments.constants";
import { gqlPostConstants } from "../../constants/gql/gql-post.constants";
import { JRPost } from "../../models/joy-reactor/post.interface";
import { ParserGqlService } from "./parser-gql.service";

@Injectable({ providedIn: 'root' })
export class PostGqlService {
  constructor(
    private readonly apollo: Apollo,
    private readonly parserGqlService: ParserGqlService) { }

  public get(id: number): Observable<JRPost> {
    const encodedId = btoa(`Post:${id}`);
    const variables = {
      id: encodedId
    };

    return this.apollo.query<any>({ query: gqlPostConstants.post, variables: variables })
      .pipe(
        map(qr => qr.data['post']),
        map(post => this.parserGqlService.parsePost(post)));
  }

  public getWithoutComments(id: number): Observable<JRPost> {
    const encodedId = btoa(`Post:${id}`);
    const variables = {
      id: encodedId
    };

    return this.apollo.query<any>({ query: gqlPostConstants.postWithoutComments, variables: variables })
      .pipe(
        map(qr => qr.data['post']),
        map(post => this.parserGqlService.parsePost(post)));
  }

  public getAll(ids: number[]): Observable<JRPost[]> {
    const encodedIds = ids
      .map(id => `Post:${id}`)
      .map(id => btoa(id));

    let variables: any = {};
    for (let i = 0; i < ids.length; i++) {
      variables[`id${i}`] = encodedIds[i];
    }

    const queryParameters = ids
      .map((id, i) => `$id${i}: ID!`)
      .join(',');

    const queries = ids
      .map((id, i) => `post${i}:node(id: $id${i}) { ...PostWithoutCommentsFields }`)
      .join('\n');

    const query = gql`
    query posts(${queryParameters}) {
      ${queries}
    }
    ${gqlFragmentsConstants.postWithoutComments}
    ${gqlFragmentsConstants.user}
    ${gqlFragmentsConstants.blog}
    ${gqlFragmentsConstants.image}
    ${gqlFragmentsConstants.postAttributePicture}
    ${gqlFragmentsConstants.postAttributeEmbed}
    ${gqlFragmentsConstants.comment}
    ${gqlFragmentsConstants.parentComment}
    ${gqlFragmentsConstants.commentAttributePicture}
    ${gqlFragmentsConstants.commentAttributeEmbed}`

    return this.apollo.query<any>({ query: query, variables: variables })
      .pipe(
        map(qr => ids.map((id, i) => qr.data[`post${i}`])),
        map(posts => posts.map(p => this.parserGqlService.parsePost(p))));
  }
}