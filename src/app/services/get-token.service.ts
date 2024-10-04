import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  constructor() { }

  getName(): string {
    let res : string = ''

    const token = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      res = decodedToken.firstName;
    }
    return res;
  }

  getId(): string {
    let res : string = ''

    const token = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      res = decodedToken.id;
    }
    return res;
  }

  getRole(): string {
    let res : string = ''

    const token = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      res = decodedToken.role;
    }
    return res;
  }

  getToken(): string {
    let res : string = ''

    const token = localStorage.getItem('token');
    if (token != null) {
      res = token;
    }
    return res;
  }
}
