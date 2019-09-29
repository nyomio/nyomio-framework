import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationPageComponent} from './organization-page.component';
import {ErrorComponent} from "../../../common/error/error.componet";
import {CovalentDataTableModule, CovalentLoadingModule} from "@covalent/core";
import {CovalentDynamicFormsModule} from "@covalent/dynamic-forms";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('OrganizationPageComponent', () => {
  let component: OrganizationPageComponent;
  let fixture: ComponentFixture<OrganizationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationPageComponent, ErrorComponent, CovalentDataTableModule,
        CovalentDynamicFormsModule,
        BrowserDynamicTestingModule,
        CovalentLoadingModule,]
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
