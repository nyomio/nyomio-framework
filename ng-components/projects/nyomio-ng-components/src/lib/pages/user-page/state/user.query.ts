import {Injectable} from '@angular/core';
import {UserStore} from './user.store';
import {RouterQuery} from '@datorama/akita-ng-router-store';
import {EntityEditorQuery} from '../../../entity-editor/entity-editor.query';

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends EntityEditorQuery {

  constructor(protected store: UserStore,
              routerQuery: RouterQuery) {
    super(routerQuery, store);

  }

}

