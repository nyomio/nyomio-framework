import {UiErrorService} from '../error/ui-error-service';
import {EntityStore} from '@datorama/akita';
import {EntityEditorEntityState} from './entity-editor.store';
import {EntityEditorModel} from './entity-editor.model';
import {Moment} from 'moment';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {EntityEditorQuery} from './entity-editor.query';
import {HttpClient} from '@angular/common/http';
import {handleHttpError} from '../error/error.util';

export abstract class EntityEditorService extends UiErrorService {

  protected constructor(protected router: Router,
                        protected route: ActivatedRoute,
                        protected entityStore: EntityStore<EntityEditorEntityState<any>>,
                        protected entityQuery: EntityEditorQuery,
                        protected http: HttpClient) {
    super(entityStore);
  }

  abstract buildGetAtUrl(timestamp: number, filter?: string): string;
  abstract buildUpsertUrl(): string;
  abstract buildDeleteUrl(selectedId: number): string;

  getAt(timestamp: number, filter?: string) {
    this.entityStore.setLoading(true);
    this.http.get(this.buildGetAtUrl(timestamp, filter))
    .pipe(handleHttpError(this.entityStore))
    .subscribe((value: EntityEditorModel[]) => {
        this.entityStore.setLoading(false);
        this.entityStore.remove(this.entityQuery.getAll().map(entity => entity.id));
        this.entityStore.add(value);
      }
    );
  }

  upsert(entity: EntityEditorModel) {
    this.entityStore.setLoading(true);
    const originalId = entity.id;
    this.http.put(this.buildUpsertUrl(), entity)
    .pipe(handleHttpError(this.entityStore))
    .subscribe((resp: number) => {
      this.entityStore.setLoading(false);
      this.setSelected(null);
      entity.id = resp;
      if (originalId === 0) {
        this.entityStore.add(entity);
      } else {
        this.entityStore.replace(resp, entity);
      }
    });
  }

  deleteSelected() {
    this.entityStore.setLoading(true);
    const selectedId = this.entityQuery.getValue().ui.selectedEntity;
    this.http.delete(this.buildDeleteUrl(selectedId))
    .pipe(handleHttpError(this.entityStore))
    .subscribe((resp: number) => {
      this.entityStore.setLoading(false);
      this.entityStore.remove(selectedId);
    });
  }

  setSelected(id: number) {
    this.entityStore.update(
      state => ({ui: {...state.ui, selectedEntity: id, newEntityMode: false}})
    );
  }

  setNewMode(mode: boolean) {
    this.entityStore.update(state => ({ui: {...state.ui, newEntityMode: mode}}));
  }

  setFilterTextAndUpdateEntities(filterText: string) {
    this.entityStore.update(state => ({ui: {...state.ui, filterText: filterText}}));
    this.updateEntities();
  }

  updateEntities() {
    const state  = this.entityQuery.getValue();
    this.getAt(this.entityQuery.filterAtLastValue.valueOf(), state.ui.filterText);
  }

  setFilterAt(filterAt: Moment) {
    const navigationExtras: NavigationExtras = {
      queryParams: {filterAt : filterAt.valueOf()},
      queryParamsHandling: 'merge',
      replaceUrl: true,
      relativeTo: this.route
    };
    this.router.navigate([], navigationExtras);
  }


}
