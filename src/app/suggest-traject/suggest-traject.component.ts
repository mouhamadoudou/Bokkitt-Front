import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';
import { TripService } from '../services/trip.service';
import { AuthcheckService } from '../services/authcheck.service';
import { GetTokenService } from '../services/get-token.service';

@Component({
  selector: 'app-suggest-traject',
  templateUrl: './suggest-traject.component.html',
  styleUrl: './suggest-traject.component.css',
  providers: [provideNativeDateAdapter()]
})

export class SuggestTrajectComponent implements OnInit {
  public licensePlate: string = '';
  public baggagePaid: boolean = false;
  public dataSource: any;
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Mermoz", "Pikine"];
  selectedDate: string | null = null;
  selectedTime: string | null = null;

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  creditCardForm!: FormGroup;

  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions = new Observable<string[]>;
  filteredOptions2 = new Observable<string[]>;

  filterValues = {
    depart: '',
    destination: '',
    nbSeat: ''
  };

  onDateSelected(date: string) {
    this.selectedDate = date;
  }

  onTimeSelected(time: string) {
    this.selectedTime = time;
  }

  constructor(private fb: FormBuilder, authService: AuthentificationService, private router: Router,
    private tripService: TripService,
    public autCheck: AuthcheckService,
    private getToken: GetTokenService,

  ) {
  }

  ngOnInit() {
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
    const filterValue = value.toLowerCase();
    return this.city.filter(option => option.toLowerCase().includes(filterValue)).slice(0, 2);
  }

  validateNumberInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  pushData(): Promise<void> {
    const body = {
      departure: this.filterValues.depart,
      destination: this.filterValues.destination,
      date: this.selectedDate,
      time: this.selectedTime,
      numberrequest: this.filterValues.nbSeat,
      id_client: this.getToken.getId()
    }

    return new Promise((resolve, reject) => {
      this.tripService.createRequestTrip(body).subscribe(
        (data) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  onSubmitbtn(): void {
    if (this.autCheck.isConnected()) {
      localStorage.setItem('suggestData', "true");
      this.pushData()
      this.router.navigate(["home"])
    } else {
      const tripData = {
        departure: this.filterValues.depart,
        destination: this.filterValues.destination,
        date: this.selectedDate,
        time: this.selectedTime,
        numberrequest: this.filterValues.nbSeat
      }

      localStorage.setItem('suggestData', JSON.stringify(tripData));
      this.router.navigate(["login-client"])
    }
  }
}