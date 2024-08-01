import { Component } from '@angular/core';
import {ChangeDetectionStrategy, } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DateInputComponent {
  minDate: Date;
  todayDate: Date;

  constructor() {
    this.todayDate = new Date();
    this.minDate = this.todayDate;
  }
}


