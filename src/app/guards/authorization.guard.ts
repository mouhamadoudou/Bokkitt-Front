import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authorize : boolean = false;
    let authorizeRoles : string[] = route.data['roles'];
    let roles : string[] = this.authService.roles as string[];
    for (let role of this.authService.roles) {
      console.log(role == authorizeRoles)
      if (role == authorizeRoles) {
        authorize = true;
      }
    }
    return authorize;
  }
}