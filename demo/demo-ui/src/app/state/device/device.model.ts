import {EntityEditorModel} from "nyomio-ng-components";

export interface Device extends EntityEditorModel {
  name: string,
  imei: string,
}

export const defaultDevice: Device = {
  id: 0,
  name: "",
  imei: "",
};

