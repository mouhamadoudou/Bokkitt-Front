import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthcheckService } from '../services/authcheck.service';
import { UserService } from '../services/user.service';
import { jwtDecode } from "jwt-decode"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public isOpenDrawer: boolean = false;
  public userName: string = "";
  constructor(public authService: AuthentificationService,
    private router: Router,
    public authCheck: AuthcheckService,
    public userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });

    // if (this.authService.roles && this.authService.roles.includes('DRIVER')) {
    //   this.router.navigate(['/driver-dashboard']);
    // }
  }

  // new Promise((resolve, reject) => {
  //   this.userService.getUserById("5").subscribe(
  //     (data) => {
  //      console.log("looooooooooooool", data)
  //       resolve("ok");  
  //     },
  //     (error) => {
  //       console.error('Error fetching user:', error);
  //       reject(error);
  //     }
  //   );
  // });

  getName(): void {
    // console.log("hello worldddd")
    const token = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      // console.log(decodedToken)
        this.userName = decodedToken.firstName;
    }
    // console.log(this.userName)
  }

  logout(): void {
    console.log("okkke")
    this.authService.logout()
  }
}
