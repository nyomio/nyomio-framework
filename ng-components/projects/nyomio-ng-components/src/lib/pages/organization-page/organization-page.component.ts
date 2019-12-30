import {Component, OnInit} from '@angular/core';
import {OrganizationQuery} from './state/organization.query';
import {OrganizationService} from './state/organization.service';
import {defaultOrganization} from './state/organization.model';
import {ITdDynamicElementConfig, TdDynamicElement} from '@covalent/dynamic-forms';
import {Column} from 'nyomio-ng-components/lib/nyom-table/nyom-table.component';

@Component({
  selector: 'nyomio-organization-page',
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
