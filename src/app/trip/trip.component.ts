import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { filter } from 'rxjs/operators';
import { TmpTripDataService } from '../services/tmp-trip-data.service';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit {

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  tripId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private  router: Router, 
    public authService: AuthentificationService,
    private tmpTripData : TmpTripDataService,
    public tripService : TripService
  ) { }

  ngOnInit(): void {
    this.trajectData = {};

    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('id')!;
      if (this.tripId != undefined) {
        this.loadAndInitTrips(this.tripId)
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  loadAndInitTrips(tripId : number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getTripById(tripId).subscribe(
        (data) => {
          this.trajectData = data
          console.log("ddd = ", this.trajectData)
          resolve();  
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
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
