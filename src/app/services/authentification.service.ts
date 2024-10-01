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

  public userData = {}
  public authentificated = false;

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
            this.userData = response;
            localStorage.setItem('token', response.token);

            // const decodedToken: any = jwtDecode(response.token);
            // const userId = decodedToken.id;
            // const role = decodedToken.role;

            // console.log("--------------------Réponse reçue :", this.userData);

            this.roles = [role];
            this.authentificated = true;
            myResolve(this.userData);
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

    console.log("hello world i wannt to connnecttbekkkkkkkkkkkk")
    const req = this.http.post(this.apiUrl + "register", body);

    let request = new Promise((myResolve, myReject) => {
      req.subscribe(
        (response: any) => {
          if (response) {
            this.userData = response;
            console.log("Réponse reçue :", this.userData);
            // this.roles = [role];
            this.authentificated = true;
            this.userData = response;
            localStorage.setItem('token', response.token);

            // const decodedToken: any = jwt_decode(this.userData.token);
            // const userId = decodedToken.id;
            // const userName = decodedToken.name;
            // console.log('ID Utilisateur:', userId);
            // console.log('Nom Utilisateur:', userName);
            myResolve(this.userData);
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
    this.authentificated = false;
    // this.phoneNumber = undefined;
    this.userData = {};
    // this.roles = undefined;
    this.router.navigateByUrl("/home")
  }
}
