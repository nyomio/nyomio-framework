import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganizationQuery} from "../state/organization.query";
import {TdLoadingService} from "@covalent/core";
import {OrganizationService} from "../state/organization.service";
import {createOrganization, Organization} from "../state/organization.model";
import {
  ITdDynamicElementConfig,
  TdDynamicElement,
  TdDynamicFormsComponent
} from "@covalent/dynamic-forms";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from "moment";
import {EntityFormComponent} from "../../../common/entity-form/entity-form.component";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss'],
})
export class OrganizationPageComponent implements OnInit {

  selectedOrganization$ = this.organizationQuery.select(state => state.ui.selectedOrganization);
  newOrganizationMode$ = this.organizationQuery.select(state => state.ui.newOrganizationMode);
  loading$ = this.organizationQuery.selectLoading();

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: any[] = [
    {name: 'id', label: 'ID'},
    {name: 'org_name', label: 'Name'},
    {name: 'org_address', label: 'Address'},
  ];

  formTitle = "";

  formDeleteVisible: boolean = false;

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

  @ViewChild(EntityFormComponent, {static: false})
  entityForm: EntityFormComponent;

  constructor(public organizationQuery: OrganizationQuery,
              public organizationService: OrganizationService,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.organizationQuery.selectAll().subscribe((value: Organization[]) => {
        this.dataSource.data = value;
      }
    );

    this.selectedOrganization$.subscribe((selectedId: number) => {
      if (!this.entityForm) {
        return
      }
      if (selectedId == null) {
        this.entityForm.clearForm();
      } else {
        this.formTitle = "Edit Organization";
        this.formDeleteVisible = true;
        this.updateFormForSelected(selectedId);
      }
    });

    this.newOrganizationMode$.subscribe(
      next => {
        if (!this.entityForm || !next) {
          return
        }
        this.formTitle = "New Organization";
        this.formDeleteVisible = false;
        this.entityForm.clearForm();
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

  rowClicked(row: Organization) {
    this.organizationService.setSelected(row.id)
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
    this.entityForm.clearForm();
  }

  private createOrganizationFromForm(): Organization {
    return createOrganization(this.entityForm.getValue())
  }

  private updateFormForSelected(selectedId: number) {
    const org = this.organizationQuery.getEntity(selectedId);
    this.entityForm.setValue(org);
  }

  onRevisionTimeChange($event: moment.Moment) {
    this.organizationService.getAt($event.valueOf());
  }


}
