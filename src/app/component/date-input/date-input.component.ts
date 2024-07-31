import { Component } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
})

export class DateInputComponent {
  model: {day: number, month: number, year: number};

  constructor() {
    const today = new Date();
    this.model = {
      day: today.getDate() ,
      month: today.getMonth() + 1,
      year: today.getFullYear()
    }; 
  }
  
  getFormattedDate(): string {
    return `${this.model.day.toString().padStart(2, '0')}/${this.model.month.toString().padStart(2, '0')}/${this.model.year}`;
  }

  onDateChange(date: any): void {
    console.log("hello worlld")
    const [day, month, year] = date.split('/').map(Number);
    if (this.isValidDate(day, month, year)) {
      this.model = { day, month, year };
      console.log('Date changed:', this.model);
    }
  }

  isValidDate(day: number, month: number, year: number): boolean {
    return day > 0 && month > 0 && month <= 12 && year > 0;
  }
}


