import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopRoutingModule } from "./top.routing";
import { TopIndexComponent } from "./top-index/top-index.component";

@NgModule({
  declarations: [
    TopIndexComponent
  ],
  imports: [
    CommonModule,
    TopRoutingModule
  ]
})
export class TopModule { }
