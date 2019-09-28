import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState, AuthStore} from './auth.store';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private authStore: AuthStore,
              private http: HttpClient) {
  }

  queryLoginStateFromServer() {
    this.http.get('/api/v1/auth/user').subscribe((value: AuthState) => {
      this.authStore.update(value)
    })
  }
}
