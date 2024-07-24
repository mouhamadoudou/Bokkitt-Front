import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;

  ngAfterViewInit() {
    this.startStepper();
  }
  startStepper() {
    // setTimeout(() => {
    //   this.stepper.next();
    //   setTimeout(() => {
    //     this.stepper.next();
    //     setTimeout(() => {
    //       this.stepper.reset();
    //       this.startStepper()
    //     }, 3000);
    //   }, 3000);
    // }, 3000);
  }
}
