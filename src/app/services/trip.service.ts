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

  updateUserData(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}update-column`, userData);
  }

  getAllTrips(): Observable<any> {
    return this.http.get(`${this.baseUrl + "all-trip"}`);
  }

  getDriverNextTrip5(driverId: string, currentDate : string): Observable<any> {
    return this.http.get(`${this.baseUrl}get-driver-next-trip-5/${driverId}/${currentDate}`);
  }

  getClientHistoryById(clientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}get-trips-history-by-client/${clientId}`);
  }

  getDriverHistoryById(driverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}get-driver-history-by-driverId/${driverId}`);
  }

  getAlltripRequest(): Observable<any> {
    return this.http.get(`${this.baseUrl + "all-request-trip"}`);
  }

  getClienttripRequestById(clientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}get-trips-request-by-client/${clientId}`);
  }

  addClienTriprequests(tripClientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}add-client-triprequests`, tripClientData);
  }

  cancelClienTriprequests(tripClientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}delete-client-triprequests`, tripClientData);
  }

  getTripById(tripId: number): Observable<any> {
    return this.http.get(`${this.baseUrl + "trip"}/${tripId}`);
  }

  createTrip(tripData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}create-trip`, tripData);
  }

  createRequestTrip(tripData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}creat-trip-requests`, tripData);
  }
}
