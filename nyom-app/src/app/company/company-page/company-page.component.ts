import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyQuery} from "../state/company.query";
import {ITdDataTableColumn, ITdDataTableRowClickEvent} from "@covalent/core";
import {CompanyService} from "../state/company.service";
import {log} from "util";
import {Company, createCompany} from "../state/company.model";
import {
  ITdDynamicElementConfig,
  TdDynamicElement,
  TdDynamicFormsComponent
} from "@covalent/dynamic-forms";

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {

  data: Company[] = [];
  selectedCompany: Company = null;
  newCompanyMode = false;

  columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'ID', sortable: true },
    { name: 'name', label: 'Name', sortable: true},
    { name: 'address', label: 'Address', sortable: true},
  ];

  @ViewChild('companyForm', {static: false})
  companyForm: TdDynamicFormsComponent;

  formElements: ITdDynamicElementConfig[] = [{
    name: 'name',
    label: 'Company Name',
    type: TdDynamicElement.Input,
    required: true,
  }, {
    name: 'address',
    label: 'Company Address',
    type: TdDynamicElement.Input,
  }];

  constructor(public companyQuery: CompanyQuery, private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.get();
    this.companyQuery.selectAll().subscribe( (value: Company[]) => {
        log(value);
        this.data = value;
      }
    );
  }

  rowClicked(event: ITdDataTableRowClickEvent) {
    const row: Company = event.row;
    this.selectedCompany = row;
    this.newCompanyMode = false;
    this.companyForm.dynamicForm.controls.address.setValue(row.address);
    this.companyForm.dynamicForm.controls.name.setValue(row.name);
  }

  save() {
    if (this.newCompanyMode) {
      this.companyService.add(this.createCompanyFromForm())
    } else {
      this.companyService.update(this.selectedCompany.id, this.companyForm.value)
    }
  }

  cancel() {
    this.selectedCompany = null;
    this.newCompanyMode = false;
  }

  private createCompanyFromForm(): Company {
    return createCompany(this.companyForm.value)
  }

}
