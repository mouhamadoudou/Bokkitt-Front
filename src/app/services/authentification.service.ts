import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AuthentificationService {
  private apiUrl = 'http://localhost:3001/api/';

  public userData = {}
  public authentificated = false;

  // public phoneNumber! : any;
  public roles: any;
  // public users : any = {
  //   '787536469' : ['USER', 'ADMIN'],
  // }

  // public driver : any = {
  //   '787536468' : ['DRIVER']
  // }

  constructor(private router: Router, private http: HttpClient) { }

  public async login(phoneNumber: string, password: string, role: string): Promise<any> {

    const body = { phonenumber: phoneNumber, password: password, role: (role == "USER" ? "clients" : "driver"), };

    const req = this.http.post(this.apiUrl + 'login', body);

    let request = new Promise((myResolve, myReject) => {
      req.subscribe(
        (response: any) => {
          if (response) {
            this.userData = response;
            localStorage.setItem('token', response.token);

            console.log("--------------------Réponse reçue :", this.userData);
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

    const body = { firstName: firstname, lastName: lastname, password: password, phonenumber : number, role : (role == "USER" ? "clients" : "driver")};

    console.log("hello world i wannt to connnecttbekkkkkkkkkkkk")
    const req = this.http.post(this.apiUrl + "register", body);

    let request = new Promise((myResolve, myReject) => {
      req.subscribe(
        (response) => {
          if (response) {
            this.userData = response;
            console.log("Réponse reçue :", this.userData);
            this.roles = [role];
            this.authentificated = true;
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
    this.roles = undefined;
    this.router.navigateByUrl("/home")
  }
}
