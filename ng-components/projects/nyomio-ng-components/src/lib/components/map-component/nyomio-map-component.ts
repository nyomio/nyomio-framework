import {Component, OnInit} from '@angular/core';
import * as mbPolyline from '@mapbox/polyline';
import * as mapboxgl from 'mapbox-gl';
import {Marker} from 'mapbox-gl';
import {MapStateQuery} from './state/map-state.query';
import {MarkerData, RouteData} from './state/map-state.store';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nyomio-map',
  template: '<div class="map" id="map" class="match-parent"></div>',
  styles: [
      `.match-parent {
      flex: 1;
      width: 100%;
      height: 100%;
    }`]
})
export class NyomioMapComponent implements OnInit {
  map: mapboxgl.Map;
  markersOnMap: Marker[] = [];

  constructor(private mapStateQuery: MapStateQuery) {
  }

  ngOnInit() {
    const uiState = this.mapStateQuery.getValue().uiState;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: uiState.styleUrl,
      zoom: uiState.zoom,
      center: [uiState.initialLng, uiState.initialLat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.mapStateQuery.select('routes').subscribe((routes) => {
        this.clearRoutes();
        routes.forEach(route => this.addRoute(route));
      });

      this.mapStateQuery.select('markers').subscribe((markers) => {
        this.clearMarkers();
        markers.forEach(marker => this.addMarker(marker));
      });
    });

  }

  private clearMarkers() {
    this.markersOnMap.forEach(marker => marker.remove());
    this.markersOnMap = [];
  }

  private clearRoutes() {
    this.map.getStyle().layers
    .filter(layer => layer.id.startsWith('route'))
    .forEach(layer => this.map.removeLayer(layer.id));
  }

  private addMarker(markerData: MarkerData) {
    this.markersOnMap.push(
      new mapboxgl.Marker({color: markerData.color})
      .setLngLat([markerData.lng, markerData.lat])
      .addTo(this.map)
    );
  }

  private addRoute(routeData: RouteData) {
    const routeId = 'route' + routeData.id;
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {
            name: 'One Route'
          },
          geometry: {
            type: 'LineString',
            coordinates: mbPolyline.toGeoJSON(routeData.line).coordinates
          }
        }]
      }
    } as any;

    this.map.addLayer({
      type: 'line',
      id: routeId,
      source,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': routeData.color,
        'line-width': 5
      }
    });

    this.map.on('click', 'route', (e) => {
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<a>${e.features[0].properties.name}</a>`)
      .addTo(this.map);
    });
  }
}
