import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import * as moment from "moment";
import {FormControl} from "@angular/forms";
import {debounce} from "rxjs/operators";
import {interval} from "rxjs";

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

  @Output()
  onDateTimeChange = new EventEmitter<moment.Moment>();

  modeToggle = 'now';
  selectedDate: moment.Moment = null;
  timeZonePart = '';
  selectedTime: moment.Duration = null;
  selectedTimeControl = new FormControl('');

  constructor() {
  }

  ngOnInit() {
    this.selectedTimeControl.valueChanges.pipe(
      debounce(() => interval(1500))
    ).subscribe(newValue => {
      this.updateSelectedTime();
    });
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
      let parsedDuration = moment.duration({
        seconds: +(timeParts[2].split("+")[0].trim()),
        minutes: +timeParts[1],
        hours: +timeParts[0],
      });
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
