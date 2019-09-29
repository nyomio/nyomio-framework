import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganizationQuery} from "../state/organization.query";
import {ITdDataTableColumn, ITdDataTableRowClickEvent, TdLoadingService} from "@covalent/core";
import {OrganizationService} from "../state/organization.service";
import {log} from "util";
import {createOrganization, Organization} from "../state/organization.model";
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
  selectedOrganization$ = this.organizationQuery.select(state => state.ui.selectedOrganization);
  newOrganizationMode$ = this.organizationQuery.select(state => state.ui.newOrganizationMode);
  loading$ = this.organizationQuery.selectLoading();

  columns: ITdDataTableColumn[] = [
    {name: 'id', label: 'ID', sortable: true},
    {name: 'org_name', label: 'Name', sortable: true},
    {name: 'org_address', label: 'Address', sortable: true},
  ];

  @ViewChild('organizationForm', {static: false})
  organizationForm: TdDynamicFormsComponent;

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

  constructor(public organizationQuery: OrganizationQuery,
              public organizationService: OrganizationService,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.organizationService.get();
    this.organizationQuery.selectAll().subscribe((value: Organization[]) => {
        log(value.toString());
        this.data = value;
      }
    );

    this.selectedOrganization$.subscribe((selectedId: number) => {
      if (!this.organizationForm) {
        return
      }
      if (selectedId == null) {
        this.clearForm();
      } else {
        this.updateFormForSelected(selectedId);
      }
    });

    this.newOrganizationMode$.subscribe(
      next => {
        if (!this.organizationForm || !next) {
          return
        }
        this.clearForm();
      }
    );

    this.organizationQuery.selectLoading().subscribe((loading: boolean) => {
      if (loading) {
        this._loadingService.register('organization');
      } else {
        this._loadingService.resolve('organization');
      }
    });
  }

  rowClicked(event: ITdDataTableRowClickEvent) {
    this.organizationService.setSelected(event.row.id)
  }

  save() {
    if (this.organizationQuery.getValue().ui.newOrganizationMode) {
      this.organizationService.upsert(this.createOrganizationFromForm())
    } else {
      const org = this.createOrganizationFromForm();
      org.id = this.organizationQuery.getValue().ui.selectedOrganization;
      this.organizationService.upsert(org)
    }
  }

  cancel() {
    this.organizationService.setSelected(null);
  }

  delete() {
    this.organizationService.deleteSelected();
  }

  private createOrganizationFromForm(): Organization {
    return createOrganization(this.organizationForm.value)
  }

  private clearForm() {
    this.organizationForm.dynamicForm.reset();
  }

  private updateFormForSelected(selectedId: number) {
    const org = this.organizationQuery.getEntity(selectedId);
    this.organizationForm.dynamicForm.controls.org_address.setValue(org.org_address);
    this.organizationForm.dynamicForm.controls.org_name.setValue(org.org_name);
  }

}
