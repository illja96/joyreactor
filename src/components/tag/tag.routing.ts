import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TagIndexComponent } from "./tag-index/tag-index.component";

const routes: Routes = [
  { path: 'tag/:id', pathMatch: 'full', component: TagIndexComponent },
  { path: 'tag/:id/page/:page', pathMatch: 'full', component: TagIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }