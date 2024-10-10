import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';
import { TripService } from '../services/trip.service';
import { GetTokenService } from '../services/get-token.service';


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
  public licensePlate: string = '';
  public dataSource: any;
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
    departuredesc: '',
    destination: '',
    destinationdesc: '',
    nbSeat: '',
    bagCap: '',
    bagPrice: '',
    smoke: false,
    pets: false,
    clim: false,
    baggagePaid: false,
    carType: '',
    selectedRoad: ''
  };
  

  selectedDate: string = "null";
  selectedTime: string = "null";
  selectedPrice: string = "null";

  roads: Road[] = [
    { value: 'Autoroute', viewValue: 'Autoroute' },
    { value: 'Nationale', viewValue: 'Nationale' },
    { value: 'Les deux', viewValue: 'Les deux' }
  ];

  carTypes: Road[] = [
    { value: '7-places', viewValue: '7 places' },
    { value: '4x4', viewValue: '4x4' },
    { value: 'Berline', viewValue: 'Berline' },
    { value: 'Car/Bus', viewValue: 'Car/Bus' },
    { value: 'Mini-bus', viewValue: 'Mini bus' },
    { value: 'Hybride', viewValue: 'Hybride' }
  ];

  constructor(private fb: FormBuilder, 
    public authService: AuthentificationService,
    private tripService: TripService,
    private getToken: GetTokenService) { }

  formatLicensePlate(value: string) {
    const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '');
    let formattedValue = '';

    if (cleanedValue.length > 0) {
      formattedValue = cleanedValue.slice(0, 2);
    }
    if (cleanedValue.length > 2) {
      formattedValue += '-' + cleanedValue.slice(2, 5);
    }
    if (cleanedValue.length > 5) {
      formattedValue += '-' + cleanedValue.slice(5);
    }
    this.licensePlate = formattedValue;
  }

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

    return this.city.filter(option => option.toLowerCase().includes(filterValue)).slice(0, 2);
  }

  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  onDateSelected(date: string) {
    this.selectedDate = date;
    console.log("date === ", this.selectedDate)
  }

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log("time == ", time)
  }

  onPriceSelected(price: any) {
    this.selectedPrice = price;
    console.log("price == ", price)
  }


  onSubmit() {
    console.log(this.licensePlate, "ress == ", this.filterValues)

    const body = {
      time: this.selectedTime,
      date: this.selectedDate ,
      licensePlate: this.licensePlate,
      bagcap: parseInt(this.filterValues.bagCap),
      bagpay: parseInt(this.filterValues.bagPrice),
      bag: this.filterValues.baggagePaid,
      carType: this.filterValues.carType,
      clim: this.filterValues.clim,
      departure: this.filterValues.depart,
      departuredesc: this.filterValues.departuredesc,
      destination: this.filterValues.destination,
      destinationdesc: this.filterValues.destinationdesc,
      seat: parseInt(this.filterValues.nbSeat),
      pets: this.filterValues.pets,
      selectedroad: this.filterValues.selectedRoad,
      smoke: this.filterValues.smoke,
      price: parseInt(this.selectedPrice),
      driverid: parseInt(this.getToken.getId())
    }

    return new Promise((resolve, reject) => {
      this.tripService.createTrip(body).subscribe(
        (data) => {
          console.log("mohammed")
          resolve(data);
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }
}
