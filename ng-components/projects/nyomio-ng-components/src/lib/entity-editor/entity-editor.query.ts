import {Injectable} from '@angular/core';
import {EntityStore, QueryEntity} from '@datorama/akita';
import {RouterQuery} from "@datorama/akita-ng-router-store";
import {EntityEditorEntityState} from "./entity-editor.store";
import {EntityEditorModel} from "./entity-editor.model";
import {Observable} from "rxjs";
import moment, {Moment} from "moment";
import {map} from "rxjs/operators";

export class EntityEditorQuery extends QueryEntity<EntityEditorEntityState<EntityEditorModel>, EntityEditorModel> {

  filterAt$: Observable<Moment> = this.routerQuery.selectQueryParams('filterAt').pipe(
    map((filterAt: string) => {
        let momentVal = moment(Number.parseInt(filterAt));
        this.filterAtLastValue = momentVal;
        return momentVal;
      }
    )
  );

  filterAtLastValue: Moment;

  constructor(private routerQuery: RouterQuery,
              store: EntityStore<EntityEditorEntityState<EntityEditorModel>, EntityEditorModel>) {
    super(store)
  }


}
