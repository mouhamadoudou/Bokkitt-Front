import { Component, inject,ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatStepper } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { GetTokenService } from '../services/get-token.service';
import { UserService } from '../services/user.service';

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
  userData : any = {}
  tripId: number | undefined;
  selectedNbSeats: number = 1
  totalPrice : number = 1
  private _formBuilder = inject(FormBuilder);

  constructor(private fb: FormBuilder, public tripService: TripService,
    private route: ActivatedRoute,
    public getToken : GetTokenService,
    public userService : UserService

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

  loadUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(this.getToken.getId(), "clients").subscribe(
        (data) => {
          this.userData = data
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  loadAndInitTrips(tripId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getTripById(tripId).subscribe(
        (data) => {
          this.tripData = data
          this.totalPrice = data.price
          this.loadUserData()
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  onNbSeatsChange(event: any): void {
    this.selectedNbSeats = event.value;
    this.totalPrice = (this.selectedNbSeats * this.tripData.price)
  }

  onSubmit() {
    if (this.creditCardForm.valid) {
    }
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });
  isOptional = false;

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
