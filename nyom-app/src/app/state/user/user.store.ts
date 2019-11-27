import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {User} from './user.model';
import {
  EntityEditorEntityState,
  initialState
} from "nyomio-ng-components";

export interface UserState extends EntityEditorEntityState<User> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user'})
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super(initialState);
  }
}



