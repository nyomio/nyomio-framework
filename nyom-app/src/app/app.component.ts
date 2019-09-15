import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nyom-app';

  constructor(private http: HttpClient, public router: Router) {}

  user: any = null;

  ngOnInit(): void {
    this.getUser()
  }

  getSsoLogoutUrl() {
    return 'https://sso.nyomio.local/auth/realms/nyomio/protocol/openid-connect/logout?redirect_uri=' +
      `${window.location.protocol}//${window.location.host}/logout`;
  }

  getUser() {
    this.http.get('api/user').subscribe((value: any) => this.user = value.authObject)
  }

  jsLogin() {
    this.http.get('oauth/login/keycloak').subscribe((value: any) => console.log(value))
  }
}
