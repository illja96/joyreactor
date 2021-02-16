import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TagIndexComponent } from "./tag-index/tag-index.component";
import { TagListComponent } from "./tag-list/tag-list.component";

const routes: Routes = [
  { path: 'tags', pathMatch: 'full', component: TagListComponent },
  { path: 'tags/:sortBy', pathMatch: 'full', component: TagListComponent },
  { path: 'tags/:sortBy/page/:page', pathMatch: 'full', component: TagListComponent },
  { path: 'tag/:id', pathMatch: 'full', component: TagIndexComponent },
  { path: 'tag/:id/page/:page', pathMatch: 'full', component: TagIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }