import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthcheckService } from '../services/authcheck.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  public isOpenDrawer: boolean = false;
  constructor(public authService: AuthentificationService, 
    private router: Router,
    public authCheck : AuthcheckService
  ) {
  }
  ngOnInit(): void {
    const tmp =  this.authCheck.getRoles()

    console.log(tmp)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });

    // if (this.authService.roles && this.authService.roles.includes('DRIVER')) {
    //   this.router.navigate(['/driver-dashboard']);
    // }
  }

  logout(): void {
    console.log("okkke")
    this.authService.logout()
  }
}
