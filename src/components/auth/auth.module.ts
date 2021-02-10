import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth.routing";
import { AuthLoginComponent } from "./auth-login/auth-login.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
