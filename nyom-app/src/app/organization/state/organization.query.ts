import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OrganizationStore, OrganizationState } from './organization.store';
import { Organization } from './organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationQuery extends QueryEntity<OrganizationState, Organization> {


  constructor(protected store: OrganizationStore) {
    super(store);
  }

}
