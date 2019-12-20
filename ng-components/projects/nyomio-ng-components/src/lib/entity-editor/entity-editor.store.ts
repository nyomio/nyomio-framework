import {EntityState} from "@datorama/akita";

export interface EntityEditorEntityState <S> extends EntityState<S> {
  ui: {
    selectedEntity: number;
    newEntityMode: boolean;
    filterText: string;
  }
}

export const initialState: EntityEditorEntityState<any> = {
  ui: {
    selectedEntity: null,
    newEntityMode: false,
    filterText: "",
  }
};
