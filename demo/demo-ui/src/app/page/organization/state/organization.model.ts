import {EntityEditorModel} from "nyomio-ng-components";

export interface Organization extends EntityEditorModel {
  org_name: string,
  org_address: string
}

export const defaultOrganization: Organization = {
  id: 0,
  org_name: "",
  org_address: ""
};
