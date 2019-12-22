import { Component, OnInit } from '@angular/core';
import {Column} from "../../../projects/nyomio-ng-components/src/lib/nyom-table/nyom-table.component";
import {ITdDynamicElementConfig, TdDynamicElement} from "@covalent/dynamic-forms";
import {defaultOrganization} from "../organization.model";
import {OrganizationQuery} from "./organization.query";
import {OrganizationService} from "./organization.service";
import {ActivatedRoute, ActivationEnd, ParamMap, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-entity-editor-demo1',
  templateUrl: './entity-editor-demo1.component.html',
  styleUrls: ['./entity-editor-demo1.component.scss']
})
export class EntityEditorDemo1Component implements OnInit {

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
              public organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

}
