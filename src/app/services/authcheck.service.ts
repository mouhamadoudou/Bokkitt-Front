import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class AuthcheckService {

  public isConnected () {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.id != '') {
        return true;
      }
    }
    return false;
  }

  public  getRoles () {
    const token =  localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.role != '') {
        return [decodedToken.role];
      }
    }
    return [];
  }

  constructor() { }
}
