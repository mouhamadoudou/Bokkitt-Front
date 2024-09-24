import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatStepper } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit, OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  creditCardForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      Number: ['', [Validators.required, Validators.pattern('^[0-9]')]],
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
