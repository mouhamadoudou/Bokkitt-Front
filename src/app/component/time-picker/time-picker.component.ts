import { Component, Output, EventEmitter } from '@angular/core';
import {ChangeDetectionStrategy, } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  @Output() timeChange = new EventEmitter<string>();
  selectedTime: string | null = "12h-14h";
  times: string[] = [
    "00h-02h",
    "02h-04h",
    "04h-06h",
    "06h-08h",
    "08h-10h",
    "10h-12h",
    "12h-14h",
    "14h-16h",
    "16h-18h",
    "18h-20h",
    "20h-22h",
    "22h-00h"
  ]

  timesOur: string[] = [
    "00:00",
    "00:30",
     "01:00",
     "01:00",
     "01:30",
     "02:00",
     "02:30",
     "03:00",
     "03:30",
     "04:00",
     "04:00",
     "05:00",
     "05:30",
     "06:00",
     "06:30",
     "07:00",
     "07:30",
     "08:00",
     "08:30",
     "09:00",
     "09:30",
     "10:00",
     "10:30",
     "11:00",
     "11:30",
     "12:00",
     "12:30",
     "13:00",
     "13:30",
     "14:00",
     "14:30",
     "15:00",
     "15:30",
     "16:00",
     "16:30",
     "17:00",
     "17:30",
     "18:00",
     "18:30",
     "19:00",
     "19:30",
     "20:00",
     "20:30",
     "21:00",
     "21:30",
     "22:00",
     "22:30",
     "23:00",
     "23:30",
  ]
  

  onTimeChange(time: string) {
    this.selectedTime = time;
    this.timeChange.emit(time); 
  }
}
