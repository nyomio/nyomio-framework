import { ID } from '@datorama/akita';

export interface Organization {
  id: ID;
  name: string,
  address: string
}

const defaultOrganization: Organization = {
  id: 0,
  name: "",
  address: ""
};

/**
 * A factory function that creates Organization
 */
export function createOrganization(params: Partial<Organization>): Organization {
  return Object.assign({}, defaultOrganization,{
    ...params
  } as Organization);
}
