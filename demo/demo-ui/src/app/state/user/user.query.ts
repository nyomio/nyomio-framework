import {Injectable} from '@angular/core';
import {UserStore} from './user.store';
import {RouterQuery} from "@datorama/akita-ng-router-store";
import {EntityEditorQuery} from "nyomio-ng-components";

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends EntityEditorQuery {

  constructor(protected store: UserStore,
              routerQuery: RouterQuery) {
    super(routerQuery, store);

  }

}

