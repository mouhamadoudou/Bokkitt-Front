import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})



export class AuthentificationService {
  private apiUrl = 'http://localhost:3001/api/';


  // public phoneNumber! : any;
  public roles: any;


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

            this.roles = [role];
          } else {
            myReject("Réponse vide");
          }
        },
        (error) => {
          console.error("Erreur lors de la requête :", error);
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
            // this.roles = [role];
            localStorage.setItem('token', response.token);

          } else {
            myReject("Réponse vide ou invalide.");
          }
        },
        (error) => {
          console.error("Erreur lors de la requête :", error);
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
