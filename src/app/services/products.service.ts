  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';


  @Injectable({
    providedIn: 'root'
  })
  export class ProductsService {
  
    private baseUrl = 'http://localhost:3001';
  
    constructor(private http: HttpClient) {}
  
    getAllProducts(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/products`);
    }
  }