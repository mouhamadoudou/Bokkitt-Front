import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements AfterViewInit {

  @ViewChild('stepper') private stepper!: MatStepper;

  ngAfterViewInit() {
    this.startStepper();
  }

  startStepper() {
    setTimeout(() => {
      this.stepper.next();
      setTimeout(() => {
        this.stepper.next();
        setTimeout(() => {
          this.stepper.reset();
          this.startStepper()
        }, 3000);
      }, 3000);
    }, 3000);
  }
}
