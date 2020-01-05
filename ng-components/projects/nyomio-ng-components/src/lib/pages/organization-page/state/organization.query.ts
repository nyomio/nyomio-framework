import {Injectable} from '@angular/core';
import {OrganizationStore} from './organization.store';
import {RouterQuery} from '@datorama/akita-ng-router-store';
import {EntityEditorQuery} from '../../../entity-editor/entity-editor.query';

@Injectable({
  providedIn: 'root'
})
export class OrganizationQuery extends EntityEditorQuery {

  constructor(routerQuery: RouterQuery, protected store: OrganizationStore) {
    super(routerQuery, store);
  }

}
