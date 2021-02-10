import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenSubject: BehaviorSubject<string | null>;

  constructor(private readonly apollo: Apollo) {
    const token = this.getTokenDirectly();
    this.tokenSubject = new BehaviorSubject<string | null>(token);
  }

  public login(username: string, password: string): Observable<string> {
    const mutation = gql`
    mutation login($name: String!, $password: String!) {
      login(name: $name, password: $password) {
        me {
          token
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
        map(r => (r.data as any).login.me.token),
        tap(t => this.setToken(t)));
  }

  public getToken(): Observable<string | null> {
    return this.tokenSubject;
  }

  private getTokenDirectly(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }
}