import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { gqlTopConstants } from "../../constants/gql/gql-top.constants";
import { JRPost } from "../../models/joy-reactor/post.interface";
import { ParserGqlService } from "./parser-gql.service";

@Injectable({ providedIn: 'root' })
export class TopGqlService {
  constructor(
    private readonly apollo: Apollo,
    private readonly parserGqlService: ParserGqlService) { }

  public getByWeek(year: number, week: number, nsfw: boolean): Observable<JRPost[]> {
    const variables = {
      year: year,
      week: week,
      nsfw: nsfw
    };

    return this.apollo.query<any>({ query: gqlTopConstants.week, variables: variables })
      .pipe(
        map(qr => qr.data.posts as any[]),
        map(p => this.parserGqlService.parsePosts(p)));
  }
}