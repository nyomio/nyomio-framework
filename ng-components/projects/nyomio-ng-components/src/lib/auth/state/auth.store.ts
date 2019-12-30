import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';

export interface AuthState {
  user: {
    userName: string;
    email: string;
    roles: string[];
  };
  loginUrl: string;
  logoutUrl: string;
  ssoLogoutUrl: string;
  activeOrganization: string;
}

export function createInitialState(): AuthState {
  return {
    user: {
      userName: '',
      email: '',
      roles: []
    },
    loginUrl: '',
    logoutUrl: '',
    ssoLogoutUrl: '',
    activeOrganization: ''
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'auth'})
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createInitialState());
  }

}

