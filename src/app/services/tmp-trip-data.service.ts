import { Injectable } from '@angular/core';
import { TripModel } from '../models/traject.model';

@Injectable({
  providedIn: 'root'
})
export class TmpTripDataService {
  selectedTrip: TripModel | null = null;

  setTmpTrip(trip: TripModel): void {
    this.selectedTrip = trip;
  }
  getTmpTrip() {
    return this.selectedTrip;
  }
}
