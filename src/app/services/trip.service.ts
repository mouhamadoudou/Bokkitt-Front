import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl = 'http://localhost:3001/api/all-trip'

  constructor(private http: HttpClient) { }

    getAllTrips(): Observable<any> {
      return this.http.get(`${this.baseUrl}`);
    }
  
    getTripById(tripId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${tripId}`);
    }
  
    createTrip(tripData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, tripData);
    }
}