import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  

  public authenticated: boolean = false;

  constructor() {
    console.log(this.authenticated);
  }

  setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }
}
