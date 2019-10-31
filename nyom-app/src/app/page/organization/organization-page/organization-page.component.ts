import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganizationQuery} from "../state/organization.query";
import {TdLoadingService} from "@covalent/core";
import {OrganizationService} from "../state/organization.service";
import {defaultOrganization, Organization} from "../state/organization.model";
import {
  ITdDynamicElementConfig,
  TdDynamicElement,
  TdDynamicFormsComponent
} from "@covalent/dynamic-forms";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from "moment";
import {Column} from "angular-common-components-lib/lib/nyom-table/nyom-table.component";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss'],
})
export class OrganizationPageComponent implements OnInit {

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

  ngOnInit(): void {
  }


}
