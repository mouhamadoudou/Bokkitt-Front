import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrl: './my-trip.component.css'
})
export class MyTripComponent implements OnInit {
  tripData : any = []
  tripId: number = 0
  clients :any = []
  
  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private getToken: GetTokenService) {
  }

  ngOnInit(): void {
    this.loadAndInitTrips()
    // console.log(this.dataSource)
  }

  loadClientsByTripId(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getClientByTripId(this.tripId.toString()).subscribe(
        (data) => {
          this.clients = data.data
          // console.log("clientss === ", this.clients)
          // console.log("dataaaaaa == ", this.dataSource)
          resolve();
        },
        (error) => {
          // console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }

  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.route.paramMap.subscribe(params => {
        this.tripId = +params.get('id')!;
      })
      // console.log("troppp = ", this.tripId)
      this.tripService.getTripById(this.tripId  ).subscribe(
        (data) => {
          this.tripData = data
          // console.log("dataaaaaa == ", this.tripData)
          this.loadClientsByTripId()
          resolve();
        },
        (error) => {
          // console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }
}
