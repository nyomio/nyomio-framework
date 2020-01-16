import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';


export interface RouteData {
  id: number;
  line: string;
  color?: string;
  routeInfoHtml?: string;
  clickable?: boolean;
}

export interface MarkerData {
  id: number;
  lng: number;
  lat: number;
  color?: string;
  icon?: string;
  markerInfoHtml?: string;
  clickable?: boolean;
}

export interface MapUiState {
  initialLat: number;
  initialLng: number;
  styleUrl: string;
  zoom: number;
}

export interface MapState {
  markers: MarkerData[];
  routes: RouteData[];
  uiState: MapUiState;
}

export function createInitialState(): MapState {
  return {
    routes: [],
    markers: [],
    uiState: {
      initialLat: 47.497913,
      initialLng: 19.040236,
      zoom: 13,
      styleUrl: 'http://localhost:8085/styles/klokantech-basic/style.json'
    }
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'MapComponent'})
export class MapStateStore extends Store<MapState> {

  constructor() {
    super(createInitialState());
  }

}

