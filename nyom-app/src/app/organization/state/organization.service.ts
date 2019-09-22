import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {OrganizationStore} from './organization.store';
import {Organization, createOrganization} from './organization.model';

@Injectable({providedIn: 'root'})
export class OrganizationService {

  constructor(private organizationStore: OrganizationStore,
              private http: HttpClient) {
  }

  get() {
    this.organizationStore.add(
      [
        createOrganization({name: "Organization1", address: "Address1", id: 1}),
        createOrganization({name: "Organization2", address: "Address2", id: 2}),
        createOrganization({name: "Organization3", address: "Address2", id: 3}),
        createOrganization({name: "Organization4", address: "Address3", id: 4})
      ])
  }

  add(organization: Organization) {
    this.organizationStore.add(organization);
  }

  update(id, organization: Partial<Organization>) {
    this.organizationStore.update(id, organization);
  }

  remove(id: ID) {
    this.organizationStore.remove(id);
  }
}
