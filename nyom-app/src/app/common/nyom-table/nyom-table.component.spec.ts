import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NyomTableComponent } from './nyom-table.component';

describe('NyomTableComponent', () => {
  let component: NyomTableComponent;
  let fixture: ComponentFixture<NyomTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NyomTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
