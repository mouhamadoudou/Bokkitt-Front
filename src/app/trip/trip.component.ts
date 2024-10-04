import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { filter } from 'rxjs/operators';
import { TmpTripDataService } from '../services/tmp-trip-data.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;

  constructor(
    private  router: Router, 
    public authService: AuthentificationService,
    private tmpTripData : TmpTripDataService
  ) { }

  ngOnInit(): void {
    this.trajectData = this.tmpTripData.getTmpTrip();
    console.log(this.trajectData)
    if (!this.trajectData) {
      console.error("error : data");
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
  }

  onClickReserved() {
    if (this.authService.authentificated) {
      this.router.navigateByUrl("reservation")
    } else {
      this.router.navigateByUrl("login-client")
    }
  }
  
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}`;
  }
}
