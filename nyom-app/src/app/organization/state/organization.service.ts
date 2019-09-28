import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationStore} from './organization.store';
import {Organization} from './organization.model';
import {OrganizationQuery} from "./organization.query";

@Injectable({providedIn: 'root'})
export class OrganizationService {

  constructor(private organizationStore: OrganizationStore,
              private organizationQuery: OrganizationQuery,
              private http: HttpClient) {
  }

  get() {
    this.organizationStore.setLoading(true);
    this.http.get('/api/v1/admin/organization/all').subscribe((value: Organization[]) => {
        this.organizationStore.setLoading(false);
        this.organizationStore.add(value)
      }
    )
  }

  upsert(organization: Organization) {
    this.organizationStore.setLoading(true);
    const originalId = organization.id;
    this.http.put('/api/v1/admin/organization', organization).subscribe((resp: number) => {
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
    const selectedId = this.organizationQuery.getValue().ui.selectedOrganization;
      this.http.delete(`/api/v1/admin/organization/${selectedId}`)
      .subscribe((resp: number) => {
        this.organizationStore.setLoading(false);
        this.organizationStore.remove(selectedId);
      });
  }

  setSelected(id: number) {
    this.organizationStore.update({ui: {selectedOrganization: id, newOrganizationMode: false}})
  }

  setNewMode(mode: boolean) {
    this.organizationStore.update({ui: {selectedOrganization: null, newOrganizationMode: mode}})
  }
}
