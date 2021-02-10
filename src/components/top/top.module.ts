import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopRoutingModule } from "./top.routing";
import { TopIndexComponent } from "./top-index/top-index.component";
import { FeedModule } from "../feed/feed.module";

@NgModule({
  declarations: [
    TopIndexComponent
  ],
  imports: [
    CommonModule,
    FeedModule,
    TopRoutingModule
  ]
})
export class TopModule { }
