import { HttpLink, RequestHandler } from "@apollo/client/core";
import { ApolloLink } from 'apollo-link';
import { setContext } from "apollo-link-context";
import { JRProfile } from "src/models/joy-reactor/profile.interface";

export abstract class ApolloAuthProvider {
  public static getAuthContext(): any  {
    const a = setContext((operation, context) => {
      const profileJson = localStorage.getItem('profile');
      if (profileJson === null) return;
      const profile = JSON.parse(profileJson) as JRProfile;
      const authorization = `Bearer ${profile.token}`;
      return new HttpLink({ headers: authorization });
    });

    return a;
  }
}