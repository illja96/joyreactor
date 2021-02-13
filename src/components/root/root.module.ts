import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { ApolloLink, InMemoryCache } from "@apollo/client/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { setContext } from "apollo-link-context";
import { RootRoutingModule } from "./root.routing";
import { RootIndexComponent } from "./root-index/root-index.component"
import { environment } from "../../environments/environment";
import { RootFooterComponent } from "./root-footer/root-footer.component";
import { RootNavComponent } from "./root-nav/root-nav.component";
import { AuthModule } from "../auth/auth.module";
import { FeedModule } from "../feed/feed.module";
import { TopModule } from "../top/top.module";
import { JRProfile } from "../../models/joy-reactor/profile.interface";

@NgModule({
  declarations: [
    RootFooterComponent,
    RootIndexComponent,
    RootNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    FeedModule,
    TopModule,
    RootRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const auth = setContext(() => {
          const profileJson = localStorage.getItem('profile');
          if (profileJson === null) return {};
          const profile = JSON.parse(profileJson) as JRProfile;
          const authorization = `Bearer ${profile.token}`;
          return { headers: authorization };
        });

        return ({
          cache: new InMemoryCache(),
          link: ApolloLink.from([
            auth as unknown as ApolloLink,
            httpLink.create({ uri: environment.graphQlUri })])
        })
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [RootIndexComponent]
})
export class RootModule { }