import {Component, OnInit} from '@angular/core';
import {MapStateService} from '../../../projects/nyomio-ng-components/src/lib/components/map-component/state/map-state.service';

@Component({
  selector: 'app-map-test',
  templateUrl: './map-test.component.html',
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }
  `]
})
export class MapTestComponent implements OnInit {
  i = 0;

  constructor(private mapStateService: MapStateService) {
  }

  ngOnInit() {

  }

  addRouteClicked() {
    this.i = this.i + 1;
    this.mapStateService.addRoute({
      id: this.i,
      line: 'cs|`HohusB\\jFHnATpFRpEHvB@|@?R?XBl@BbADp@L|AJ`ARfCF~@b@fHD|' +
        '@LpBN~BJhBBV?JBf@@V@HDx@JfBNvCDp@RpDFdA@VHfCBl@@Z@p@DrA@p@@tB?h@@zDAzE@zCAnB?dA@hI???p@?HCfR?D' +
        '?x@DfKAdB?jDBbH@n@DpJA|B?`A?\\@lI?f@ArAAxACr@Ih@M^a@n@GVE\\Eh@Bn@d@rANf@Z`ADXR`AR|@Jh@v@tELv@' +
        'Jr@ZnBv@jEDTnApHD\\l@bDRdAFX@Hd@`Ch@rCLj@@l@d@fC^tBNt@P|@Rd@DZdAtFTjAP~@Px@RhAXdBHd@\\fBDVdAj' +
        'GHh@Jl@j@tDXhBHl@VhBCd@ERIRED_@VmAt@UNcAl@OHMJYV[b@KVO`@GNIRk@|AOb@e@rAWv@O^GNGRM\\EJ]~@[|@O\\' +
        'a@~@a@z@ITCRDT@x@Ft@Fr@Fh@Dl@?FBXBT',
      color: 'rgba(100, 243, 140, 1 )'
    });
  }

  addMarkerClicked() {
    this.mapStateService.addMarker({
      id: 1,
      lat: 47.497913,
      lng: 19.040236,
      color: 'red'
    });
  }

  clearMarkers() {
    this.mapStateService.clearMarkers();
  }

  clearRoutes() {
    this.mapStateService.clearRoutes();
  }
}
