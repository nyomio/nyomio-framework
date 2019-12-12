import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {AuthState, AuthStore} from './auth.store';

@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

}
