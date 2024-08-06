import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateInputComponent } from '../component/date-input/date-input.component'
import { MatStepper } from '@angular/material/stepper';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


interface Road {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',

  providers: [provideNativeDateAdapter()]
})
export class AddTripComponent implements OnInit {
  public baggagePaid : boolean = false;
  public dataSource : any;
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Mermoz", "Pikine"];

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  creditCardForm!: FormGroup;

  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions = new Observable<string[]>;
  filteredOptions2 = new Observable<string[]>;

  filterValues = {
    depart: '',
    destination: ''
  };

  
  roads: Road[] = [
    {value: 'Autoroute', viewValue: 'Autoroute'},
    {value: 'Nationale', viewValue: 'Nationale'},
    {value: 'Les deux', viewValue: 'Les deux'}
  ];

  carTypes: Road[] = [
    {value: '7-places', viewValue: '7 places'},
    {value: '4x4', viewValue: '4x4'},
    {value: 'Berline', viewValue: 'Berline'},
    {value: 'Car/Bus', viewValue: 'Car/Bus'},
    {value: 'Mini-bus', viewValue: 'Mini bus'},
    {value: 'Hybride', viewValue: 'Hybride'}
  ];

  constructor(private fb: FormBuilder) {  }
  
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      Number: ['', [Validators.required, Validators.pattern('^[0-9]')]],
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    console.log(this.dataSource)
    const filterValue = value.toLowerCase();

    return this.city.filter(option => option.toLowerCase().includes(filterValue)).slice(0,2);
  }
  
  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
    }
  }
  

  onSubmit() {
    if (this.creditCardForm.valid) {
      console.log('Form Submitted', this.creditCardForm.value);
    }
  }
}
