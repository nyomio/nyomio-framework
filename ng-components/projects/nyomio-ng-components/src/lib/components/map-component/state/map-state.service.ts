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

  addMarker(markerData: MarkerData) {
    this.mapStateStore.update(oldState => {
      return Object.assign({}, oldState, {
        markers: [...oldState.markers, markerData]
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

  addRoute(routeData: RouteData) {
    this.mapStateStore.update(oldState => {
      return Object.assign({}, oldState, {
        routes: [...oldState.routes, routeData]
      } as MapState);
    });
  }
}
