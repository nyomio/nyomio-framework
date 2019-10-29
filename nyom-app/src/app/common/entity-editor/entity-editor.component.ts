import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TdLoadingService} from "@covalent/core";
import {ITdDynamicElementConfig} from "@covalent/dynamic-forms";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from "moment";
import {EntityFormComponent} from "../entity-form/entity-form.component";
import {QueryEntity} from "@datorama/akita";
import {EntityEditorService} from "./entity-editor.service";
import {Observable} from "rxjs";
import {createEntityEditorModel, EntityEditorModel} from "./entity-editor.model";
import {EntityEditorEntityState} from "./entity-editor.store";
import {Column} from "../nyom-table/nyom-table.component";

@Component({
  selector: 'entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  @Input()
  entityName: string;

  @Input()
  columns: Column[] = [];

  @Input()
  formElements: ITdDynamicElementConfig[] = [];

  @Input()
  query: QueryEntity<EntityEditorEntityState<EntityEditorModel>>;
  
  @Input()
  service: EntityEditorService;

  @Input()
  defaultEntity: EntityEditorModel;

  loading$: Observable<boolean>;

  selectedEntity$: Observable<number>;
  newEntityMode$: Observable<boolean>;

  dataSource: MatTableDataSource<EntityEditorModel> = new MatTableDataSource<EntityEditorModel>();

  formTitle = "";

  formDeleteVisible: boolean = false;

  @ViewChild(EntityFormComponent, {static: false})
  entityForm: EntityFormComponent;

  constructor(private _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.loading$ = this.query.selectLoading();
    this.selectedEntity$ = this.query.select(state => state.ui.selectedEntity);
    this.newEntityMode$ = this.query.select(state => state.ui.newEntityMode);
    this.query.selectAll().subscribe((value: any[]) => {
        this.dataSource.data = value;
      }
    );

    this.selectedEntity$.subscribe((selectedId: number) => {
      if (!this.entityForm) {
        return
      }
      if (selectedId == null) {
        this.entityForm.clearForm();
      } else {
        this.formTitle = `Edit ${this.entityName}`;
        this.formDeleteVisible = true;
        this.updateFormForSelected(selectedId);
      }
    });

    this.newEntityMode$.subscribe(
      next => {
        if (!this.entityForm || !next) {
          return
        }
        this.formTitle = `New ${this.entityName}`;
        this.formDeleteVisible = false;
        this.entityForm.clearForm();
      }
    );

    this.query.selectLoading().subscribe((loading: boolean) => {
      if (loading) {
        this._loadingService.register(this.entityName);
      } else {
        this._loadingService.resolve(this.entityName);
      }
    });
  }

  rowClicked(row: any) {
    this.service.setSelected(row.id)
  }

  save() {
    if (this.query.getValue().ui.newEntityMode) {
      this.service.upsert(this.createEntityFromForm())
    } else {
      const org = this.createEntityFromForm();
      org.id = this.query.getValue().ui.selectedEntity;
      this.service.upsert(org)
    }
  }

  cancel() {
    this.service.setSelected(null);
  }

  delete() {
    this.service.deleteSelected();
    this.entityForm.clearForm();
  }

  private createEntityFromForm(): any {
    return createEntityEditorModel(this.defaultEntity, this.entityForm.getValue());
  }

  private updateFormForSelected(selectedId: number) {
    const org = this.query.getEntity(selectedId);
    this.entityForm.setValue(org);
  }

  onRevisionTimeChange($event: moment.Moment) {
    this.service.getAt($event.valueOf());
  }

}
