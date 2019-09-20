import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {CompanyStore} from './company.store';
import {Company, createCompany} from './company.model';

@Injectable({providedIn: 'root'})
export class CompanyService {

  constructor(private companyStore: CompanyStore,
              private http: HttpClient) {
  }

  get() {
    this.companyStore.add(
      [
        createCompany({name: "Company1", address: "Address1", id: 1}),
        createCompany({name: "Company2", address: "Address2", id: 2}),
        createCompany({name: "Company3", address: "Address2", id: 3}),
        createCompany({name: "Company4", address: "Address3", id: 4})
      ])
  }

  add(company: Company) {
    this.companyStore.add(company);
  }

  update(id, company: Partial<Company>) {
    this.companyStore.update(id, company);
  }

  remove(id: ID) {
    this.companyStore.remove(id);
  }
}
