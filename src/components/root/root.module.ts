import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { ApolloLink, InMemoryCache } from "@apollo/client/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { TagModule } from "../tag/tag.module";
import { DiscussionModule } from "../discussion/discussion.module";
import { PostModule } from "../post/post.module";
import { RootHomeComponent } from "./root-home/root-home.component";
import { JoyreactorTagRedirectInterceptor } from "../../interceptors/joyreactor-tag-redirect.interceptor";
import { RootHotKeysComponent } from "./root-hot-keys/root-hot-keys.component";

@NgModule({
  declarations: [
    RootFooterComponent,
    RootHomeComponent,
    RootHotKeysComponent,
    RootIndexComponent,
    RootNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    DiscussionModule,
    FeedModule,
    PostModule,
    TagModule,
    TopModule,
    RootRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JoyreactorTagRedirectInterceptor, multi: true },
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