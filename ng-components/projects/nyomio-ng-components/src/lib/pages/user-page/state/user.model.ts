import {EntityEditorModel} from '../../../entity-editor/entity-editor.model';

export interface User extends EntityEditorModel {
  email: string;
  name: string;
}

export const defaultUser: User = {
  id: 0,
  email: '',
  name: '',
};

