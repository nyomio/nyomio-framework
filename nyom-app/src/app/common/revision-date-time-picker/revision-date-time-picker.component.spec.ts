import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RevisionDateTimePickerComponent} from './revision-date-time-picker.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import * as moment from "moment";

describe('RevisionDateTimePickerComponent', () => {
  let component: RevisionDateTimePickerComponent;
  let fixture: ComponentFixture<RevisionDateTimePickerComponent>;
  let toggleBtnDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionDateTimePickerComponent],
      imports: [MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatButtonToggleModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toggleBtnDes = fixture.debugElement.queryAll(By.css("mat-button-toggle"));

  });

  it('should create with "now" selected by default', () => {
    expect(component).toBeTruthy();
    expect(toggleBtnDes[0].classes["mat-button-toggle-checked"]).toBeTruthy();
    expect(byCss('#datetime-selector')).toBeFalsy();
  });

  it('click on "Specific date" toggle button should show date selector', () => {
    clickSpecificDateBtn();
    expect(toggleBtnDes[1].classes["mat-button-toggle-checked"]).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#datetime-selector'))).toBeTruthy();
  });

  it('entering a date should update time and emit new date', () => {
    clickSpecificDateBtn();
    setDateInput('1982-12-18')
    let timeInput = byCss('input[name=timeOfDateTime');
    expect(timeInput.nativeElement.value).toBe("00:00:00 +01:00")
  });

  it('unix epoch should be parsed correctly and new date should be emitted', () => {
    clickSpecificDateBtn();
    let emittedDate: moment.Moment = null;
    component.onDateTimeChange.subscribe(next => emittedDate = next);
    let dateInputDe = setDateInput('1571330938');
    let timeInput = byCss('input[name=timeOfDateTime');
    expect(timeInput.nativeElement.value).toBe("18:48:58 +02:00");
    expect(dateInputDe.nativeElement.value).toBe("2019-10-17");
    expect(emittedDate).toEqual(moment(1571330938000));

  });

  it('java epoch should be parsed correctly and new date should be emitted', () => {
    clickSpecificDateBtn();
    let emittedDate: moment.Moment = null;
    component.onDateTimeChange.subscribe(next => emittedDate = next);
    let dateInputDe = setDateInput('1576318320000');
    let timeInput = byCss('input[name=timeOfDateTime');
    expect(timeInput.nativeElement.value).toBe("11:12:00 +01:00");
    expect(dateInputDe.nativeElement.value).toBe("2019-12-14");
    expect(emittedDate).toEqual(moment(1576318320000));
  });

  it('should emmit new date if time part is changed', () => {
    clickSpecificDateBtn();
    let emittedDate: moment.Moment = null;
    component.onDateTimeChange.subscribe(next => emittedDate = next);
    setDateInput('2015-05-10');
    let timeInput = byCss('input[name=timeOfDateTime');
    expect(timeInput.nativeElement.value).toBe("00:00:00 +02:00");

    timeInput.nativeElement.value = "18:50:00 +02:00";

  });

  function setDateInput(value: string): DebugElement {
    let inputDe = byCss('input[name="revisionDate"]');
    inputDe.nativeElement.click();
    inputDe.nativeElement.value = value;
    inputDe.nativeElement.dispatchEvent(new Event('input'));
    inputDe.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    return inputDe;
  }

  function clickSpecificDateBtn() {
    let dateBtnDe = byCss('mat-button-toggle[value=specific-date] > button');
    dateBtnDe.nativeElement.click();
    fixture.detectChanges();
  }

  function byCss(selector: string): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

});

