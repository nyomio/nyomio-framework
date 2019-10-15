import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationPageComponent} from './organization-page.component';
import {ErrorComponent} from "../../../common/error/error.componet";
import {CovalentDataTableModule, CovalentLoadingModule} from "@covalent/core";
import {CovalentDynamicFormsModule} from "@covalent/dynamic-forms";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent;
  let fixture: ComponentFixture<OrganizationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationPageComponent, ErrorComponent],
      imports: [
        CovalentDataTableModule,
        CovalentDynamicFormsModule,
        BrowserDynamicTestingModule,
        CovalentLoadingModule,
        MatCardModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
