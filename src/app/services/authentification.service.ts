import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public phoneNumber! : any;
  public roles : any;
  public authentificated = false;
  public users : any = {
    '787536469' : ['USER', 'ADMIN'],
  }

  public driver : any = {
    '787536468' : ['DRIVER']
  }

  constructor(private router : Router) { }

  public loginClient(phoneNumber : string, password : string) : boolean {
    console.log(phoneNumber)
    if (this.users[phoneNumber] &&  password == "1234") {
      this.phoneNumber = phoneNumber;
      this.roles = this.users[phoneNumber];
      this.authentificated = true;

      return true;
    } else {
      return false;
    } 
  }

  public loginDriver(phoneNumber : string, password : string) : boolean {
    console.log(phoneNumber)
    if (this.driver[phoneNumber] &&  password == "1234") {
      this.phoneNumber = phoneNumber;
      this.roles = this.driver[phoneNumber];
      this.authentificated = true;

      return true;
    } else {
      return false;
    } 
  }

  public logout (): void {
    this.authentificated = false;
    this.phoneNumber = undefined;
    this.roles = undefined;
    this.router.navigateByUrl("/home")
  }
}
