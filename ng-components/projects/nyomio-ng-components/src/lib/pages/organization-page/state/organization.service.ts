import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationStore} from './organization.store';
import {OrganizationQuery} from './organization.query';
import {EntityEditorService} from 'nyomio-ng-components';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class OrganizationService extends EntityEditorService {

  constructor(router: Router,
              route: ActivatedRoute,
              private organizationStore: OrganizationStore,
              private organizationQuery: OrganizationQuery,
              http: HttpClient) {
    super(router, route, organizationStore, organizationQuery, http);
  }

  buildDeleteUrl(selectedId: number): string {
    return `/api/v1/admin/organization/${selectedId}`;
  }

  buildGetAtUrl(timestamp: number, filter?: string): string {
    return '/api/v1/admin/organization/all-at/' + timestamp + (filter ? '/' + filter : '');
  }

  buildUpsertUrl(): string {
    return '/api/v1/admin/organization';
  }

}
