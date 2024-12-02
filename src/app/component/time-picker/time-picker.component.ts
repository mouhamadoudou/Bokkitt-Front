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

  onTimeChange(time: string) {
    this.selectedTime = time;
    this.timeChange.emit(time); 
  }
}
