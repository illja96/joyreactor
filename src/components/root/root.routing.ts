import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootHomeComponent } from "./root-home/root-home.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RootHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
