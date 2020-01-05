export interface EntityEditorModel {
  id: number;
}

export function createEntityEditorModel(defaultEntity: any, params: Partial<EntityEditorModel>): EntityEditorModel {
  return Object.assign({}, defaultEntity, {
    ...params
  } as EntityEditorModel);
}
