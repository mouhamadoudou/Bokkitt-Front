import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { filter } from 'rxjs/operators';
import { TmpTripDataService } from '../services/tmp-trip-data.service';
import { TripService } from '../services/trip.service';
import { UserService } from '../services/user.service';
import { AuthcheckService } from '../services/authcheck.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit {

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;
  tripId: number | undefined;
  userData : any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthentificationService,
    private tmpTripData: TmpTripDataService,
    public userService: UserService,
    public tripService: TripService,
    public authCheck: AuthcheckService,
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

  uploadDriverData(driverId: string) {
    new Promise((resolve, reject) => {
      const token: any = localStorage.getItem('token');

      this.userService.getUserById(driverId, "driver").subscribe(
        (data) => {
          this.userData = data;
          // console.log("user date == ", this.userData)
          resolve("ok");
        },
        (error) => {
          // console.error('Error fetching user:', error);
          reject(error);
        }
      );
    });
  }


  loadAndInitTrips(tripId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getTripById(tripId).subscribe(
        (data) => {
          this.trajectData = data
          this.uploadDriverData(this.trajectData.driverid)
          // console.log("ddd = ", this.trajectData)
          resolve();
        },
        (error) => {
          // console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }

  onClickReserved() {
    if (this.authCheck.isConnected()) {
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
