
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getIdToken())
      .pipe(switchMap(token => {
          req = req.clone({
            setHeaders: {
              authorization: token
            }
          });

      return next.handle(req);
    }));

  }

}