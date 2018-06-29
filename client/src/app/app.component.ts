import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  onSubmit() {
    return false;
  }

  onLogin() {
    console.log('clicked');
    return false;
  }

  onLoginWithGoogle() {
    console.log('clicked');
    return false;
  }
}
