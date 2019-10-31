import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {Organization} from './organization.model';
import {EntityEditorEntityState, initialState} from "angular-common-components-lib";

export interface OrganizationState extends EntityEditorEntityState<Organization> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'organization'})
export class OrganizationStore extends EntityStore<OrganizationState, Organization> {
  constructor() {
    super(initialState);
  }
}


