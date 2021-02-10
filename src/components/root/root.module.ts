import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { RootRoutingModule } from "./root.routing";
import { RootIndexComponent } from "./root-index/root-index.component"
import { InMemoryCache } from "@apollo/client/core";
import { environment } from "../../environments/environment";
import { RootFooterComponent } from "./root-footer/root-footer.component";
import { RootNavComponent } from "./root-nav/root-nav.component";
import { AuthModule } from "../auth/auth.module";
import { HttpClientModule } from "@angular/common/http";
import { FeedModule } from "../feed/feed.module";
import { TopModule } from "../top/top.module";

@NgModule({
  declarations: [
    RootFooterComponent,
    RootIndexComponent,
    RootNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FeedModule,
    TopModule,
    RootRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: environment.graphQlUri })
      }),
      deps: [HttpLink],
    }
  ],
  bootstrap: [RootIndexComponent]
})
export class RootModule { }