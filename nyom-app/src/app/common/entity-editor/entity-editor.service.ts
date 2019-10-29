import {UiErrorService} from "../error/error.util";
import {EntityStore} from "@datorama/akita";
import {EntityEditorEntityState} from "./entity-editor.store";
import {EntityEditorModel} from "./entity-editor.model";

export abstract class EntityEditorService extends UiErrorService {

  protected constructor(private entityStore: EntityStore<EntityEditorEntityState<any>>) {
    super(entityStore)
  }

  abstract getAt(timestamp: number);
  abstract upsert(entity: EntityEditorModel);
  abstract deleteSelected();

  setSelected(id: number) {
    this.entityStore.update({ui: {selectedEntity: id, newEntityMode: false}})
  }

  setNewMode(mode: boolean) {
    this.entityStore.update({ui: {selectedEntity: null, newEntityMode: mode}})
  }

}
