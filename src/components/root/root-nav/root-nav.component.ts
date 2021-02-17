import { Component } from "@angular/core";
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

  constructor(
    private readonly authGqlService: AuthGqlService,
    private readonly headerService: HeaderService) {
    this.header = undefined!;
    this.isAuthorized = false;

    this.headerService.get()
      .subscribe(h => this.header = h);

    this.authGqlService.getProfile()
      .subscribe(p => this.isAuthorized = p !== undefined);
  }

  public onLogoutClick(): void {
    this.authGqlService.logout();
  }
}