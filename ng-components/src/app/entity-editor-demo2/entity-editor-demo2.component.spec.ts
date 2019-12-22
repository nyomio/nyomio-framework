import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditorDemo2Component } from './entity-editor-demo2.component';

describe('EntityEditorDemo2Component', () => {
  let component: EntityEditorDemo2Component;
  let fixture: ComponentFixture<EntityEditorDemo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditorDemo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditorDemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
