import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MapStateStore, MapState } from './map-state.store';

@Injectable({ providedIn: 'root' })
export class MapStateQuery extends Query<MapState> {

  constructor(protected store: MapStateStore) {
    super(store);
  }

}
