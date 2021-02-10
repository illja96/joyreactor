import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { gqlAuthConstants } from "../constants/gql/gql-auth.constants";
import { JRProfile } from "../models/joy-reactor/profile.interface";
import { ParserService } from "./parser.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly profileSubject: BehaviorSubject<JRProfile | undefined>;

  constructor(
    private readonly apollo: Apollo,
    private readonly parserService: ParserService) {
    const token = this.getTokenDirectly();
    this.profileSubject = new BehaviorSubject<JRProfile | undefined>(token);
  }

  public login(username: string, password: string): Observable<JRProfile> {
    const variables = {
      name: username,
      password: password
    };

    return this.apollo.mutate<any>({ mutation: gqlAuthConstants.login, variables: variables })
      .pipe(
        map(fr => this.parserService.parseProfile(fr)),
        tap(p => this.setProfile(p)));
  }

  public getProfile(): Observable<JRProfile | undefined> {
    return this.profileSubject;
  }

  public logout(): void {
    localStorage.removeItem('profile');
    this.profileSubject.next(undefined);
  }

  private getTokenDirectly(): JRProfile | undefined {
    const profileJson = localStorage.getItem('profile');
    if (profileJson === null) return undefined;

    const profile = JSON.parse(profileJson) as JRProfile;
    return profile;
  }

  private setProfile(profile: JRProfile): void {
    const profileJson = JSON.stringify(profile);
    localStorage.setItem('profile', profileJson);

    this.profileSubject.next(profile);
  }
}