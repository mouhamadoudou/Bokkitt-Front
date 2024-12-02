import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = 'https://api.bokkitt.com/api/'
  private baseUrl = 'http://localhost:3021/api/'

  constructor(private http: HttpClient) { }

    getUserById(userId : String, role : string): Observable<any> {
      return this.http.get(`${this.baseUrl}get-user/${userId}/${role}`);
    }
  }