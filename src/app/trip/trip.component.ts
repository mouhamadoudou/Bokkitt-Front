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
    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('id')!;
      if (this.tripId != undefined) {
        this.loadAndInitTrips(this.tripId.toString())
      }
      // Tu peux utiliser this.productId pour récupérer les détails du produit
    });

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

  loadAndInitTrips(tripId : string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getClientHistoryById(tripId).subscribe(
        (data) => {
          this.trajectData = data.data
          console.log("dataaaaaa == ", this.trajectData)
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
