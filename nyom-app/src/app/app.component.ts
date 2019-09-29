import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthQuery} from "./auth/state/auth.query";
import {AuthService} from "./auth/state/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nyom-app';
  user$ = this.authQuery.select(store => store.user);
  auth$ = this.authQuery.select();

  constructor(public authQuery: AuthQuery, public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.authService.queryLoginStateFromServer();
  }

  currentLocation() {
    return `${window.location.protocol}//${window.location.host}`;
  }
}
