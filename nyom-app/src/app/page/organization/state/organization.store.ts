import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Organization} from './organization.model';
import {initialState, EntityEditorEntityState} from "../../../common/entity-editor/entity-editor.store";

export interface OrganizationState extends EntityEditorEntityState<Organization> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'organization'})
export class OrganizationStore extends EntityStore<OrganizationState, Organization> {
  constructor() {
    super(initialState);
  }
}


