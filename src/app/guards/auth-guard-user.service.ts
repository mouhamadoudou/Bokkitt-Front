import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { AuthcheckService } from '../services/authcheck.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserService implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router,
    private authCheck: AuthcheckService) { }

  private userOutIn = ["trip", "suggest-traject", "home"]

  private driverOutIn = ["add-trip"]

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authorize: boolean = false;
    let profile: string = route.data['profile'];
    let roles: string[] = this.authCheck.getRoles() as string[];
    let isConnected: boolean = this.authCheck.isConnected()

    if (!isConnected) {
      console.log("not connnnect")

      return true;
    }

    if (roles.includes("USER") && profile == "p-user") {
      console.log("p  userrrrr")
      return true
    }

    if (roles.includes("DRIVER") && profile == "p-driver") {
      console.log("p  driverrrrr")

      return true
    }

    console.log("le falseeeeeeee")
    console.log(roles.includes("USER") && profile == "p-user")
    console.log(profile )

    this.router.navigateByUrl("/404");
    return false;
  }
}