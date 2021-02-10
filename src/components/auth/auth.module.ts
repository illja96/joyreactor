import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth.routing";
import { AuthLoginComponent } from "./auth-login/auth-login.component";

@NgModule({
  declarations: [
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
