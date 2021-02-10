import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLoginComponent } from "./auth-login/auth-login.component";

const routes: Routes = [
  { path: 'auth', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth/login', pathMatch: 'full', component: AuthLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
