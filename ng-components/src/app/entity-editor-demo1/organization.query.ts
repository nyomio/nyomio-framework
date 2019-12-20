import {Injectable} from '@angular/core';
import {OrganizationStore} from './organization.store';
import {RouterQuery} from "@datorama/akita-ng-router-store";
import {EntityEditorQuery} from "../../../projects/nyomio-ng-components/src/lib/entity-editor/entity-editor.query";

@Injectable({
  providedIn: 'root'
})
export class OrganizationQuery extends EntityEditorQuery {

  constructor(protected store: OrganizationStore,
              routerQuery: RouterQuery) {
    super(routerQuery, store);

  }

}
