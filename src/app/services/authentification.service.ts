import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public username! : any;
  public roles : any;
  public authentificated = false;
  public users : any = {
    'admin' : ['STUDENT', 'ADMIN'],
    'user1' : ['STUDENT']
  }

  constructor(private router : Router) { }

  public login(usernam : string, password : string) : boolean {
    if (this.users[usernam] &&  password == "1234") {
      this.username = usernam;
      this.roles = this.users[usernam];
      this.authentificated = true;

      return true;
    } else {
      return false;
    } 
  }

  public logout (): void {
    this.authentificated = false;
    this.username = undefined;
    this.roles = undefined;
    this.router.navigateByUrl("/login")
  }
}
