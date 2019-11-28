import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStore} from './user.store';
import {UserQuery} from "./user.query";
import {
  EntityEditorService,
} from "nyomio-ng-components";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthQuery} from "../../common/auth/state/auth.query";

@Injectable({providedIn: 'root'})
export class UserService extends EntityEditorService {

  constructor(router: Router,
              route: ActivatedRoute,
              userStore: UserStore,
              userQuery: UserQuery,
              http: HttpClient,
              private authQuery: AuthQuery
  ) {
    super(router, route, userStore, userQuery, http);
  }

  buildGetAtUrl(timestamp: number, filter?: string): string {
    return `/api/v1/admin/${this.authQuery.getValue().activeOrganization}/user/own-at/${timestamp}${filter ? "/" + filter : ""}`;
  }

  buildUpsertUrl(): string {
    return `/api/v1/admin/${this.authQuery.getValue().activeOrganization}/user`;
  }

  buildDeleteUrl(selectedId: number): string {
    return `/api/v1/admin/user/${selectedId}`;
  }

}


