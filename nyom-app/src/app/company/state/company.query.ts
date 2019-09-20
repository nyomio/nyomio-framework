import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CompanyStore, CompanyState } from './company.store';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyQuery extends QueryEntity<CompanyState, Company> {

  constructor(protected store: CompanyStore) {
    super(store);
  }

}
