import {Component, OnInit} from '@angular/core';
import {Column} from "nyomio-ng-components/lib/nyom-table/nyom-table.component";
import {ITdDynamicElementConfig, TdDynamicElement} from "@covalent/dynamic-forms";
import {defaultDevice} from "../../state/device/device.model";
import {DeviceQuery} from "../../state/device/device.query";
import {DeviceService} from "../../state/device/device.service";
import {ActivatedRoute, ActivationEnd, ParamMap, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  columns: Column[] = [
    {name: 'id', label: 'ID'},
    {name: 'name', label: 'Name'},
    {name: 'imei', label: 'Imei'},
  ];

  formElements: ITdDynamicElementConfig[] = [
    {
      name: 'name',
      label: 'Name',
      type: TdDynamicElement.Input,
      required: true,
    },
    {
      name: 'imei',
      label: 'Imei',
      type: TdDynamicElement.Input,
      required: true,
    },
  ];

  defaultEntity = defaultDevice;

  constructor(public deviceQuery: DeviceQuery,
              public deviceService: DeviceService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

}

