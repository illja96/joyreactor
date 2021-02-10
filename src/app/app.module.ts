import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InMemoryCache } from "@apollo/client/core";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
