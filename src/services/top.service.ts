import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { gqlTopConstants } from "../constants/gql/gql-top.constants";
import { JRPost } from "../models/joy-reactor/post.interface";
import { ParserService } from "./parser.service";

@Injectable({ providedIn: 'root' })
export class TopService {
  constructor(
    private readonly apollo: Apollo,
    private readonly parserService: ParserService) { }

  public getByWeek(year: number, week: number, nsfw: boolean): Observable<JRPost[]> {    
    const variables = {
      year: year,
      week: week,
      nsfw: nsfw
    };

    return this.apollo.query<any>({ query: gqlTopConstants.week, variables: variables })
      .pipe(map(qr => this.parserService.parsePosts(qr)));
  }
}