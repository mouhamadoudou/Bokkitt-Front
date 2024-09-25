import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl = 'http://localhost:3001/api/'

  constructor(private http: HttpClient) { }

    getAllTrips(): Observable<any> {
      return this.http.get(`${this.baseUrl + "all-trip"}`);
    }
  
    getTripById(tripId: number): Observable<any> {
      return this.http.get(`${this.baseUrl + "trip"}/${tripId}`);
    }
  
    createTrip(tripData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, tripData);
    }

    createRequestTrip(tripData: any): Observable<any> {
      console.log("okkkkkkkkkkkkk");
      return this.http.post(`${this.baseUrl}trip-requests`, tripData); 
    }
}
