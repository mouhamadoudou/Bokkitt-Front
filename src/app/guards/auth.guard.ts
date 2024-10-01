import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { AuthcheckService } from '../services/authcheck.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router,
    public authCheck: AuthcheckService

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isConnected = this.authCheck.isConnected();
    const roles = this.authCheck.getRoles(); 

    if (isConnected) {
      if (roles.includes("USER")) {
        this.router.navigateByUrl("/home");
      } else if (roles.includes("DRIVER")) {
        this.router.navigateByUrl("/driver-dashboard");
      }
      return false; 
    } else {
      return true;
    }
  }
}