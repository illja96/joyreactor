import { Component } from "@angular/core";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent {
  public isAuthorized: boolean;

  constructor(private readonly authService: AuthService) {
    this.isAuthorized = false;
    this.authService.getToken()
      .subscribe(t => this.isAuthorized = t !== null);
  }
}