import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateInputComponent } from '../component/date-input/date-input.component'
import { MatStepper } from '@angular/material/stepper';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',

  providers: [provideNativeDateAdapter()],
})
export class AddTripComponent implements OnInit {



  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  creditCardForm!: FormGroup;

  constructor(private fb: FormBuilder) {  }

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
}
