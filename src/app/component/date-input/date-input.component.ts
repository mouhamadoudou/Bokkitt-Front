import { Component, Output, EventEmitter } from '@angular/core';
import {ChangeDetectionStrategy, } from '@angular/core';


@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DateInputComponent {
  minDate: Date;
  todayDate: Date;
  @Output() dateChange = new EventEmitter<string>();

  constructor() {
    this.todayDate = new Date();
    this.minDate = this.todayDate;
  }
  onDateChange(newDate: Date) {
    this.dateChange.emit(newDate.toISOString());
  }
}


