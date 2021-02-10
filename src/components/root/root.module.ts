import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { RootRoutingModule } from "./root.routing";
import { RootIndexComponent } from "./index/root-index.component"
import { InMemoryCache } from "@apollo/client/core";
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [
    RootIndexComponent
  ],
  imports: [
    BrowserModule,
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
    },
  ],
  bootstrap: [RootIndexComponent]
})
export class RootModule { }
