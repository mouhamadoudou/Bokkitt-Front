import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})



export class AuthentificationService {
  // private apiUrl = 'https://api.bokkitt.com/api/';
  private apiUrl = 'http://localhost:3021/api/';


  constructor(private router: Router, private http: HttpClient,
  ) { }

  public async login(phoneNumber: string, password: string, role: string): Promise<any> {

    const body = { phonenumber: phoneNumber, password: password, role: (role == "USER" ? "clients" : "driver"), };

    const req = this.http.post(this.apiUrl + 'login', body);

    let request = new Promise((myResolve, myReject) => {
      req.subscribe(
        (response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            // console.log("locallll host sett")
            myResolve(true)
          } else {
            myReject("Réponse vide");
          }
        },
        (error) => {
          // console.error("Erreur lors de la requête :", error);
          myReject(error);
        }
      );
    });
    return request;
  }

  public async register(firstname: string, lastname: string, number: string, password: string, role: string): Promise<any> {

    const body = { firstName: firstname, lastName: lastname, password: password, phonenumber: number, role: (role == "USER" ? "clients" : "driver") };

    const req = this.http.post(this.apiUrl + "register", body);

    let request = new Promise((myResolve, myReject) => {
      req.subscribe(
        (response: any) => {
          if (response) {
            // console.log("resss = ", response)
            localStorage.setItem('token', response.token);
            myResolve(true)
          } else {
            myReject("invalide.");
          }
        },
        (error) => {
          // console.error("Erreur lors de la requête :", error);
          myReject(error);
        }
      );
    });
    return request;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/home")
  }
}
