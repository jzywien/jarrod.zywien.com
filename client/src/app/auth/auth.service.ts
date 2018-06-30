// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
  }

  get currentUserObservable(): Observable<firebase.User> {
    return this.user;
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this._firebaseAuth.auth.signInWithRedirect(provider);
  }

  async signInWithEmailAndPassword(email, password) {
    try {
      await this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
    } catch {
    }
  }

  isLoggedIn() {
    return this.userDetails != null;
  }

  getIdToken(): Promise<string> {
    return this.userDetails.getIdToken(true);
  }

  async logout() {
    const response = await this._firebaseAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}