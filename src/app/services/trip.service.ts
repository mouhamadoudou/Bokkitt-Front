import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // private baseUrl = 'https://api.bokkitt.com/api/'
  private baseUrl = 'http://localhost:3021/api/'

  constructor(private http: HttpClient) { }

  checkIfNumberExist(role: string, number : string): Observable<any> {
    return this.http.get(`${this.baseUrl}check-if-number-exist/${role}/${number}`);
  }

  updatePassword(Data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}update_password_by_phone_number`, Data);
  }

  verifyCheckCode(Data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}verify-check-code`, Data);
  }


  verifyResetCode(Data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}verify-reset-code`, Data);
  }

  
  generateCheckCode(msgData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}generate-check-code`, msgData);
  }

  sendMessage(msgData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}send-message`, msgData);
  }

  deleteTrip(tripId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete-trip/${tripId}`);
  }

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

  getClientByTripId(tripId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}get-clients-by-tripId/${tripId}`);
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

  getTripById(tripId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}get-trip-by-id/${tripId}`);
  }

  createTrip(tripData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}create-trip`, tripData);
  }

  createRequestTrip(tripData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}creat-trip-requests`, tripData);
  }
}
