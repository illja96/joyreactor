import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostIndexComponent } from "./post-index/post-index.component";

const routes: Routes = [
  { path: 'post/:id', pathMatch: 'full', component: PostIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }