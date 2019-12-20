import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NyomTableComponent} from './nyom-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

describe('NyomTableComponent', () => {
  let component: NyomTableComponent;
  let fixture: ComponentFixture<NyomTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NyomTableComponent],
      imports: [
        MatTableModule,
        MatSortModule,
      ]
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
