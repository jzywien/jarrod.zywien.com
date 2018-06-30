import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this._auth.signInWithGoogle();
  }

  loginWithGithub() {

  }

  loginWithEmail(form: NgForm) {
    const {email, password} = form.value;
    this._auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

}
