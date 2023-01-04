import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  

  // TODO Change to false
  public authenticated: boolean = false;

  constructor() {
    console.log(this.authenticated);
  }

  setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }
}
