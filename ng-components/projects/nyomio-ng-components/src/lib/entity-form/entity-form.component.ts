import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ITdDynamicElementConfig, TdDynamicFormsComponent} from "@covalent/dynamic-forms";
import {Observable} from "rxjs";

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  @ViewChild('form', {static: false})
  form: TdDynamicFormsComponent;

  @Input()
  formTitle: String;

  @Input()
  formElements: ITdDynamicElementConfig[] = [];

  @Input()
  isLoading$: Observable<boolean>;

  @Input()
  isDeleteVisible: boolean;

  @Output()
  onSaveClicked = new EventEmitter<any>();

  @Output()
  onCancelClicked = new EventEmitter<any>();

  @Output()
  onDeleteClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public clearForm() {
    this.form.dynamicForm.reset();
  }

  public getValue(): any {
    return this.form.value
  }

  public setValue(object: any) {
    for (let [key, value] of Object.entries(object)) {
      if (this.form.dynamicForm.controls[key]) {
        this.form.dynamicForm.controls[key].setValue(value);
      }
    }
  }

  emitSave() {
    this.onSaveClicked.emit();
  }

  emitCancel() {
    this.onCancelClicked.emit();
  }

  emitDelete() {
    this.onDeleteClicked.emit();
  }

}
