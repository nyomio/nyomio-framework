export interface Organization {
  id: number;
  org_name: string,
  org_address: string
}

const defaultOrganization: Organization = {
  id: 0,
  org_name: "",
  org_address: ""
};

/**
 * A factory function that creates Organization
 */
export function createOrganization(params: Partial<Organization>): Organization {
  return Object.assign({}, defaultOrganization, {
    ...params
  } as Organization);
}
