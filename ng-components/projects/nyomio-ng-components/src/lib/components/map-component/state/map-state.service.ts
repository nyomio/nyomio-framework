import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapState, MapStateStore, MarkerData, RouteData} from './map-state.store';

@Injectable({providedIn: 'root'})
export class MapStateService {

  constructor(private mapStateStore: MapStateStore,
              private http: HttpClient) {
  }


  clearMarkers() {
    this.mapStateStore.update(oldState => {
      return Object.assign({}, oldState, {
        markers: []
      } as MapState);
    });
  }

  addMarkers(markers: MarkerData[]) {
    this.mapStateStore.update(oldState => {
      return Object.assign({}, oldState, {
        markers: [...oldState.markers, ...markers]
      } as MapState);
    });
  }

  clearRoutes() {
    this.mapStateStore.update(oldState => {
      return Object.assign({}, oldState, {
        routes: []
      } as MapState);
    });
  }

  addRoutes(routes: RouteData[]) {
    this.mapStateStore.update(oldState => {
      return Object.assign({}, oldState, {
        routes: [...oldState.routes, ...routes]
      } as MapState);
    });
  }
}
