import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TopType } from "../../models/feed/top-type.enum";
import { gqlTopConstants } from "../../constants/gql/gql-top.constants";
import { JRPost } from "../../models/joy-reactor/post.interface";
import { ParserGqlService } from "./parser-gql.service";

@Injectable({ providedIn: 'root' })
export class TopGqlService {
  constructor(
    private readonly apollo: Apollo,
    private readonly parserGqlService: ParserGqlService) { }

  public getByWeek(type: TopType, year: number, week: number): Observable<JRPost[]> {
    let nsfw: boolean | null;
    switch (type) {
      case TopType.OnlySWF:
        nsfw = false;
        break;
      case TopType.All:
        nsfw = null;
        break;
      case TopType.OnlyNSFW:
        nsfw = true;
        break;
      default:
        throw new Error('Invalid top type');
    }

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