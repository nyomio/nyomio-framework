import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from './app-routing.module';
import {AuthQuery} from 'nyomio-ng-components';
import {AuthState} from 'nyomio-ng-components';
import {AuthService} from 'nyomio-ng-components';

export interface MenuEntry {
  title: string;
  route: string[];
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nyom-app';
  user$ = this.authQuery.select(store => store.user);
  auth$ = this.authQuery.select();

  menuEntries: MenuEntry[] = [];

  constructor(public authQuery: AuthQuery, public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
    this.authQuery.select().subscribe((authState: AuthState) => {
      this.updateMenuEntries(authState);
    });
  }

  private updateMenuEntries(authState: AuthState) {
    const newState: MenuEntry[] = [];
    if (authState.user.roles.indexOf('admin') !== -1) {
      newState.push({title : 'Organizations', route: [ROUTES.organizations], icon: 'dashboard'});
    }
    newState.push({title : 'Users', route: [ROUTES.users], icon: 'dashboard'});
    this.menuEntries = newState;
  }

  getUser() {
    this.authService.queryLoginStateFromServer();
  }

  currentLocation() {
    return `${window.location.protocol}//${window.location.host}`;
  }
}
