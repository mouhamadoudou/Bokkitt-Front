import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { AuthcheckService } from '../services/authcheck.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router,
  private authCheck: AuthcheckService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authorize: boolean = false;
    let authorizeRoles: string[] = route.data['roles'];
    let roles: string[] = this.authCheck.getRoles() as string[];

    for (let role of this.authCheck.getRoles()) {
      for (let autRole of authorizeRoles) {
        if (role == autRole) {
          authorize = true;
        }
      }
    }
    return authorize;
  }
}




