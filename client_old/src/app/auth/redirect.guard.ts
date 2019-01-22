import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class RedirectGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | boolean {
      return this.auth.authState.pipe(map((auth) =>  {
        if(auth != null) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      }));
  }

}