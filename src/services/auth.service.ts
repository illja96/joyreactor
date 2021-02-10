import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { JRProfile } from "src/models/joy-reactor/profile.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly profileSubject: BehaviorSubject<JRProfile | undefined>;

  constructor(private readonly apollo: Apollo) {
    const token = this.getTokenDirectly();
    this.profileSubject = new BehaviorSubject<JRProfile | undefined>(token);
  }

  public login(username: string, password: string): Observable<JRProfile> {
    const mutation = gql`
    mutation login($name: String!, $password: String!) {
      login(name: $name, password: $password) {
        me {
          token
          user {
            username
            id
          }
        }
      }
    }
    `;

    const variables = {
      name: username,
      password: password
    };

    return this.apollo.mutate({ mutation: mutation, variables: variables })
      .pipe(
        map(r => {
          const profile: JRProfile = {
            token: (r.data as any).login.me.token,
            user: {
              username: (r.data as any).login.me.user.username,
              id: (r.data as any).login.me.user.id
            }
          };
          return profile;
        }),
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
    if(profileJson === null) return undefined;

    const profile = JSON.parse(profileJson) as JRProfile;
    return profile;
  }

  private setProfile(profile: JRProfile): void {
    const profileJson = JSON.stringify(profile);
    localStorage.setItem('profile', profileJson);

    this.profileSubject.next(profile);
  }
}