import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeviceStore} from './device.store';
import {DeviceQuery} from "./device.query";
import {
  EntityEditorService,
} from "nyomio-ng-components";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthQuery} from "../../common/auth/state/auth.query";

@Injectable({providedIn: 'root'})
export class DeviceService extends EntityEditorService {

  constructor(router: Router,
              route: ActivatedRoute,
              deviceStore: DeviceStore,
              deviceQuery: DeviceQuery,
              http: HttpClient,
              private authQuery: AuthQuery
  ) {
    super(router, route, deviceStore, deviceQuery, http);
  }

  buildGetAtUrl(timestamp: number, filter?: string): string {
    return `/api/v1/admin/${this.authQuery.getValue().activeOrganization}/device/own-at/${timestamp}${filter ? "/" + filter : ""}`;
  }

  buildUpsertUrl(): string {
    return `/api/v1/admin/${this.authQuery.getValue().activeOrganization}/device`;
  }

  buildDeleteUrl(selectedId: number): string {
    return `/api/v1/admin/device/${selectedId}`;
  }

}


