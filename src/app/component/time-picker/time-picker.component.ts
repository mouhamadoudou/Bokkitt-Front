import { Component } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  times: string[] = [];
  selectedTime: string | null = "13:00";

  constructor() {
    this.generateTimes();
  }

  generateTimes() {
    const start = 0;
    const end = 24 * 60; 
    const interval = 15;

    for (let i = start; i < end; i += interval) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const time = `${this.padZero(hours)}:${this.padZero(minutes)}`;
      this.times.push(time);
    }
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
