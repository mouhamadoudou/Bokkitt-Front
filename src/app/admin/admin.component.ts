import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

    constructor (public authService : AuthentificationService, private router: Router) {

    }

    ngOnInit(): void {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }
    logout() : void {
      this.authService.logout()
    }
}
