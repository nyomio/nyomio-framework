import { Component, OnInit } from '@angular/core';

import {Column} from "../../../projects/nyomio-ng-components/src/lib/nyom-table/nyom-table.component";
import {ITdDynamicElementConfig, TdDynamicElement} from "@covalent/dynamic-forms";
import {defaultOrganization} from "../organization.model";
import {OrganizationQuery} from "./organization.query";
import {OrganizationService} from "./organization.service";

@Component({
  selector: 'app-entity-editor-demo2',
  templateUrl: './entity-editor-demo2.component.html',
  styleUrls: ['./entity-editor-demo2.component.scss']
})
export class EntityEditorDemo2Component implements OnInit {

  columns: Column[] = [
    {name: 'id', label: 'ID'},
    {name: 'org_name', label: 'Name'},
    {name: 'org_address', label: 'Address'},
  ];

  formElements: ITdDynamicElementConfig[] = [{
    name: 'org_name',
    label: 'Organization Name',
    type: TdDynamicElement.Input,
    required: true,
  }, {
    name: 'org_address',
    label: 'Organization Address',
    type: TdDynamicElement.Input,
  }];

  defaultEntity = defaultOrganization;

  constructor(public organizationQuery: OrganizationQuery,
              public organizationService: OrganizationService
  ) {
  }

  ngOnInit() {
  }

}
