import { ID } from '@datorama/akita';

export interface Company {
  id: ID;
  name: string,
  address: string
}

const defaultCompany: Company = {
  id: 0,
  name: "",
  address: ""
};

/**
 * A factory function that creates Company
 */
export function createCompany(params: Partial<Company>): Company {
  return Object.assign({}, defaultCompany,{
    ...params
  } as Company);
}
