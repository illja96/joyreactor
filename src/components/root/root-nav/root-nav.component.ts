import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SettingsService } from "../../../services/settings.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent {
  public isAuthorized: boolean;
  public form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService) {
    this.isAuthorized = false;
    this.form = new FormGroup({
      nsfw: new FormControl(false, [Validators.required])
    });
    this.form.valueChanges.subscribe(() => this.onFormValueChanges());

    this.authService.getProfile()
      .subscribe(p => this.isAuthorized = p !== undefined);
  }

  public onLogoutClick(): void {
    this.authService.logout();
  }

  private onFormValueChanges(): void {
    const nsfw: boolean = this.form.controls.nsfw.value;
    this.settingsService.setNsfw(nsfw);
  }
}