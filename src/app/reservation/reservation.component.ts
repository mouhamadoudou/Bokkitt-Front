import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatStepper } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit, OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  creditCardForm!: FormGroup;
  tripData : any = {}
  tripId: number | undefined;
  selectedNbSeats: number = 1

  constructor(private fb: FormBuilder, public tripService: TripService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('id')!;
      if (this.tripId != undefined) {
        this.loadAndInitTrips(this.tripId)
      }
    });
    this.creditCardForm = this.fb.group({
      Number: ['', [Validators.required, Validators.pattern('^[0-9]')]],
    });
  }

  loadAndInitTrips(tripId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getTripById(tripId).subscribe(
        (data) => {
          this.tripData = data
          console.log("data == ", data)
          resolve();
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }

  onSubmit() {
    if (this.creditCardForm.valid) {
      console.log('Form Submitted', this.creditCardForm.value);
    }
  }

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
