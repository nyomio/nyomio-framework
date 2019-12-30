import {Injectable} from '@angular/core';
import {OrganizationStore} from './organization.store';
import {EntityEditorQuery} from 'nyomio-ng-components';
import {RouterQuery} from '@datorama/akita-ng-router-store';

@Injectable({
  providedIn: 'root'
})
export class OrganizationQuery extends EntityEditorQuery {

  constructor(routerQuery: RouterQuery, protected store: OrganizationStore) {
    super(routerQuery, store);
  }

}
