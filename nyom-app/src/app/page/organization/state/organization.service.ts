import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationStore} from './organization.store';
import {Organization} from './organization.model';
import {OrganizationQuery} from "./organization.query";
import {handleHttpError} from "../../../common/error/error.util";
import {EntityEditorService} from "nyomio-ng-components";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class OrganizationService extends EntityEditorService {

  constructor(router: Router,
              route: ActivatedRoute,
              private organizationStore: OrganizationStore,
              private organizationQuery: OrganizationQuery,
              private http: HttpClient) {
    super(router, route, organizationStore, organizationQuery)
  }

  getAt(timestamp: number, filter?: string) {
    this.organizationStore.setLoading(true);
    this.http.get('/api/v1/admin/organization/all-at/' + timestamp + (filter ? "/" + filter : ""))
    .pipe(handleHttpError(this.organizationStore))
    .subscribe((value: Organization[]) => {
        this.organizationStore.setLoading(false);
        this.organizationStore.remove(this.organizationQuery.getAll().map(org => org.id));
        this.organizationStore.add(value)
      }
    )
  }

  upsert(organization: Organization) {
    this.organizationStore.setLoading(true);
    const originalId = organization.id;
    this.http.put('/api/v1/admin/organization', organization)
    .pipe(handleHttpError(this.organizationStore))
    .subscribe((resp: number) => {
      this.organizationStore.setLoading(false);
      this.setSelected(null);
      organization.id = resp;
      if (originalId == 0) {
        this.organizationStore.add(organization)
      } else {
        this.organizationStore.replace(resp, organization);
      }
    });
  }

  deleteSelected() {
    this.organizationStore.setLoading(true);
    const selectedId = this.organizationQuery.getValue().ui.selectedEntity;
    this.http.delete(`/api/v1/admin/organization/${selectedId}`)
    .pipe(handleHttpError(this.organizationStore))
    .subscribe((resp: number) => {
      this.organizationStore.setLoading(false);
      this.organizationStore.remove(selectedId);
    });
  }

}
