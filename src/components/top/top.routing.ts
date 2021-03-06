import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TopIndexComponent } from "./top-index/top-index.component";

const routes: Routes = [
  { path: 'top', pathMatch: 'full', component: TopIndexComponent },
  { path: 'top/:type', pathMatch: 'full', component: TopIndexComponent },
  { path: 'top/:type/:year', pathMatch: 'full', component: TopIndexComponent },
  { path: 'top/:type/:year/:week', pathMatch: 'full', component: TopIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TopRoutingModule { }
