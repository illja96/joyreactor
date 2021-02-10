import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";


@Component({
  selector: "app-auth-login",
  templateUrl: "./auth-login.component.html",
  styleUrls: ["./auth-login.component.css"]
})
export class AuthLoginComponent {
  public form: FormGroup;

  public get username() { return this.form.controls.username; }
  public get password() { return this.form.controls.password; }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  public onSubmit(): void {
    const username = this.username.value;
    const password = this.password.value;

    this.authService.login(username, password)
      .subscribe(
        () => this.router.navigateByUrl('/'),
        () => this.password.setErrors({ badPassword: true }));
  }
}