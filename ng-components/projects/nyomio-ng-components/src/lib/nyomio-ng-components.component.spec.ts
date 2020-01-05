import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NyomioNgComponentsLibComponent } from './nyomio-ng-components.component';

describe('NyomioNgComponentsLibComponent', () => {
  let component: NyomioNgComponentsLibComponent;
  let fixture: ComponentFixture<NyomioNgComponentsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NyomioNgComponentsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyomioNgComponentsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
