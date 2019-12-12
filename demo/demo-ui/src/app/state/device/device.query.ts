import {Injectable} from '@angular/core';
import {DeviceStore} from './device.store';
import {RouterQuery} from "@datorama/akita-ng-router-store";
import {EntityEditorQuery} from "nyomio-ng-components";

@Injectable({
  providedIn: 'root'
})
export class DeviceQuery extends EntityEditorQuery {

  constructor(protected store: DeviceStore,
              routerQuery: RouterQuery) {
    super(routerQuery, store);

  }

}

