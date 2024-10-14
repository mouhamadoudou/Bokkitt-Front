import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
    this.dataSource = []
    this.loadAndInitTrips()
  }

  checkDate(date : string) {
    if (this.today > new Date(date)) {
      return false 
    }
    return true;
  }

  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getClientHistoryById(this.getToken.getId()).subscribe(
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
