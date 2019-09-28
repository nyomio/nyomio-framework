import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Organization} from './organization.model';

export interface OrganizationState extends EntityState<Organization> {
  ui: {
    selectedOrganization: number;
    newOrganizationMode: boolean;
  }
}

const initialState = {
  ui: {
    selectedOrganization: null,
    newOrganizationMode: false
  }
};

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'organization'})
export class OrganizationStore extends EntityStore<OrganizationState, Organization> {
  constructor() {
    super(initialState);
  }
}


