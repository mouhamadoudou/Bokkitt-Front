import { Component } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
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
  
  selectedTime: string | null = "12h-14h";

  constructor() {
  }
}
