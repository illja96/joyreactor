import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SettingsService } from "../../../services/settings.service";
import { AuthGqlService } from "../../../services/gql/auth-gql.service";
import { HeaderService } from "../../../services/header.service";

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent {
  public header: string;
  public isAuthorized: boolean;
  public form: FormGroup;

  constructor(
    private readonly authGqlService: AuthGqlService,
    private readonly headerService: HeaderService,
    private readonly settingsService: SettingsService) {
    this.header = undefined!;
    this.isAuthorized = false;

    this.form = new FormGroup({
      nsfw: new FormControl(false, [Validators.required])
    });
    this.form.valueChanges.subscribe(() => this.onFormValueChanges());

    this.headerService.get()
      .subscribe(h => this.header = h);

    this.authGqlService.getProfile()
      .subscribe(p => this.isAuthorized = p !== undefined);
  }

  public onLogoutClick(): void {
    this.authGqlService.logout();
  }

  private onFormValueChanges(): void {
    const nsfw: boolean = this.form.controls.nsfw.value;
    this.settingsService.setNsfw(nsfw);
  }
}