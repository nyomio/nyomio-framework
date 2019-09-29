import {Injectable} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthQuery} from './state/auth.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authQuery: AuthQuery) {
  }

  canActivate(): Observable<boolean> {
    return this.authQuery.select(store => store).pipe(
      filter(state => state.loginUrl.length > 0),
      map(state => {
        if (state.user.userName.length > 0) {
          return true;
        }
        const loginUrl = this.authQuery.getValue().loginUrl;
        if (loginUrl.length != 0) {
          window.location.assign(loginUrl);
        }
        return false;
      }),
    );
  }
}
