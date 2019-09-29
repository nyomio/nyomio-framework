import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState, AuthStore} from './auth.store';
import {handleHttpError, UiErrorService} from "../../error/error.util";

@Injectable({providedIn: 'root'})
export class AuthService extends UiErrorService {

  constructor(private authStore: AuthStore,
              private http: HttpClient) {
    super(authStore)
  }

  queryLoginStateFromServer() {
    this.http.get('/api/v1/auth/user')
    .pipe(handleHttpError(this.authStore))
    .subscribe((value: AuthState) => {
      this.authStore.update(value)
    })
  }
}
