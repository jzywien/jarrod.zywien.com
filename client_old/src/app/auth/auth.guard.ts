import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.auth.authState.pipe(map((auth) =>  {
        if(auth == null) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }));
  }
}
