import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditorDemo1Component } from './entity-editor-demo1.component';

describe('EntityEditorDemo1Component', () => {
  let component: EntityEditorDemo1Component;
  let fixture: ComponentFixture<EntityEditorDemo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditorDemo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditorDemo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
