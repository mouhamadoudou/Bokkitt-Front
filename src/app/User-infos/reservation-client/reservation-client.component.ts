import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TripModel } from '../../models/traject.model';
import { TmpTripDataService } from '../../services/tmp-trip-data.service';
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrl: './reservation-client.component.css'
})
export class ReservationClientComponent implements OnInit {
  dataSource = [];
  tmpData : any = {}
  today : any;
  targetDate = new Date("2024-10-01")
  
  setTmpData (item : any) {
    this.tmpData = item
  }

  constructor (private router: Router,
    private tripService: TripService,
    private getToken: GetTokenService) {

    const currentDate = new Date();
    this.today = new Date(currentDate.toLocaleDateString()); 
  }

  ngOnInit(): void {
    console.log(this.today, " and ", this.targetDate)
    this.dataSource = []
    this.loadAndInitTrips()
    

    if (new Date(this.today) > this.targetDate) {
      console.log("La date d'aujourd'hui est après le 1er octobre 2024");
    } else if (new Date(this.today) < this.targetDate) {
      console.log("La date d'aujourd'hui est avant le 1er octobre 2024");
    } else {
      console.log("La date d'aujourd'hui est le 1er octobre 2024");
    }
  }

  checkDate(date : string) {
    if (this.today > new Date(date)) {
      return false 
    }
    return true;
  }

  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getClientTripById(this.getToken.getId()).subscribe(
        (data) => {
          this.dataSource = data.data
          console.log("dataaaaaa == ", this.dataSource)
          resolve();  
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }

  myTrip () : void {
    this.router.navigate(['my-trip-client']);
  }
}
