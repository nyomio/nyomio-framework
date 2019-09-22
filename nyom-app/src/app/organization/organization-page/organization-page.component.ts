import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganizationQuery} from "../state/organization.query";
import {ITdDataTableColumn, ITdDataTableRowClickEvent} from "@covalent/core";
import {OrganizationService} from "../state/organization.service";
import {log} from "util";
import {Organization, createOrganization} from "../state/organization.model";
import {
  ITdDynamicElementConfig,
  TdDynamicElement,
  TdDynamicFormsComponent
} from "@covalent/dynamic-forms";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {

  data: Organization[] = [];
  selectedOrganization: Organization = null;
  newOrganizationMode = false;

  columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'ID', sortable: true },
    { name: 'name', label: 'Name', sortable: true},
    { name: 'address', label: 'Address', sortable: true},
  ];

  @ViewChild('organizationForm', {static: false})
  organizationForm: TdDynamicFormsComponent;

  formElements: ITdDynamicElementConfig[] = [{
    name: 'name',
    label: 'Organization Name',
    type: TdDynamicElement.Input,
    required: true,
  }, {
    name: 'address',
    label: 'Organization Address',
    type: TdDynamicElement.Input,
  }];

  constructor(public organizationQuery: OrganizationQuery, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.get();
    this.organizationQuery.selectAll().subscribe( (value: Organization[]) => {
        log(value);
        this.data = value;
      }
    );
  }

  rowClicked(event: ITdDataTableRowClickEvent) {
    const row: Organization = event.row;
    this.selectedOrganization = row;
    this.newOrganizationMode = false;
    this.organizationForm.dynamicForm.controls.address.setValue(row.address);
    this.organizationForm.dynamicForm.controls.name.setValue(row.name);
  }

  save() {
    if (this.newOrganizationMode) {
      this.organizationService.add(this.createOrganizationFromForm())
    } else {
      this.organizationService.update(this.selectedOrganization.id, this.organizationForm.value)
    }
  }

  cancel() {
    this.selectedOrganization = null;
    this.newOrganizationMode = false;
  }

  private createOrganizationFromForm(): Organization {
    return createOrganization(this.organizationForm.value)
  }

}
