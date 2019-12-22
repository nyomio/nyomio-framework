import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import moment, {Moment} from "moment";
import {FormControl} from "@angular/forms";
import {debounce} from "rxjs/operators";
import {interval, Observable} from "rxjs";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

const MAIN_DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const TIME_ZONE_FORMAT = 'Z';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: MAIN_DATE_FORMAT,
  },
  display: {
    dateInput: MAIN_DATE_FORMAT,
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: MAIN_DATE_FORMAT,
    monthYearA11yLabel: 'YYYY MMM',
  }
};

@Component({
  selector: 'revision-date-time-picker',
  templateUrl: './revision-date-time-picker.component.html',
  styleUrls: ['./revision-date-time-picker.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class RevisionDateTimePickerComponent implements OnInit {

  @Input()
  value$: Observable<moment.Moment>;

  @Output()
  onDateTimeChange = new EventEmitter<moment.Moment>();

  modeToggle = 'now';
  selectedDate: moment.Moment;
  timeZonePart = '';
  selectedTime: moment.Duration;
  selectedTimeControl = new FormControl('');

  constructor() {
  }

  ngOnInit() {
    this.selectedTimeControl.valueChanges.pipe(
      debounce(() => interval(1500))
    ).subscribe(newValue => {
      this.updateSelectedTime();
    });
    this.value$.subscribe((value: Moment) => {
      if (!this.selectedDate || !value.isSame(this.selectedDate.clone().add(this.selectedTime))) {
        this.updateSelectedDateTime(value, true);
        this.modeToggle = 'specific-date';
      }
    })
  }

  timeOfDateTimeKeyPress(event: any) {
    if (event.key == "Enter") {
      this.updateSelectedTime();
    }
  }

  dateChange(event: MatDatepickerInputEvent<moment.Moment>) {
    if (event.value == null) {
      const timestamp = Number((event.targetElement as HTMLInputElement).value);
      if (isNaN(timestamp)) {
        this.updateSelectedDateTime(null, false);
        (event.targetElement as HTMLInputElement).value = "";
      } else if (timestamp > 1000000000000) {
        // timestamp in seconds
        this.updateSelectedDateTime(moment(timestamp));
      } else if (timestamp > 1000000000) {
        // timestamp in seconds
        this.updateSelectedDateTime(moment(timestamp * 1000));
      }
    } else {
      this.updateSelectedDateTime(event.value);
    }
  }

  floorTime() {
    this.selectedTime = moment.duration(0, 's');
    this.updateTimeInputValue();
    this.emmitDateTimeChange();
  }

  modeToggleChange(event: MatButtonToggleChange) {
    this.modeToggle = event.value;
  }

  onNowClick() {
    this.updateSelectedDateTime(this.now());
  }

  private now(): moment.Moment {
    return moment().startOf('second');
  }

  private updateSelectedDateTime(newDateTime: moment.Moment, updateTimePart: boolean = true) {
    if (!newDateTime) {
      return;
    }
    this.selectedDate = newDateTime.clone().startOf('day');
    this.timeZonePart = this.selectedDate.format(TIME_ZONE_FORMAT);
    if (updateTimePart) {
      this.selectedTime = moment.duration(newDateTime.diff(this.selectedDate));
      this.updateTimeInputValue();
    }
    this.emmitDateTimeChange();
  }

  private updateTimeInputValue() {
    this.selectedTimeControl.setValue(this.selectedDate.clone().add(this.selectedTime).format(TIME_FORMAT))
  }

  private updateSelectedTime() {
    try {
      let timeParts = this.selectedTimeControl.value.split(":");
      let h: number = +timeParts[0];
      let m = +timeParts[1];
      let s = +(timeParts[2].split("+")[0].trim());
      if (isNaN(h) || isNaN(m) || isNaN(s)) {
        return;
      }
      let parsedDuration = moment.duration({hours: h, minutes: m, seconds: s});
      if (parsedDuration.asMilliseconds() != this.selectedTime.asMilliseconds()) {
        this.selectedTime = parsedDuration;
        this.emmitDateTimeChange();
      }
    } catch (e) {
      console.log("Could not parse time input");
    }
  }

  private emmitDateTimeChange() {
    this.onDateTimeChange.emit(this.selectedDate.clone().add(this.selectedTime));
  }

}
