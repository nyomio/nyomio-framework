import {EntityEditorModel} from "nyomio-ng-components";

export interface User extends EntityEditorModel {
  email: string,
  name: string,
}

export const defaultUser: User = {
  id: 0,
  email: "",
  name: "",
};

