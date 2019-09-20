import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Company } from './company.model';

export interface CompanyState extends EntityState<Company> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'company' })
export class CompanyStore extends EntityStore<CompanyState, Company> {

  constructor() {
    super();
  }

}

