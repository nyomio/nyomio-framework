import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {Device} from './device.model';
import {
  EntityEditorEntityState,
  initialState
} from "nyomio-ng-components";

export interface DeviceState extends EntityEditorEntityState<Device> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'device'})
export class DeviceStore extends EntityStore<DeviceState, Device> {
  constructor() {
    super(initialState);
  }
}



