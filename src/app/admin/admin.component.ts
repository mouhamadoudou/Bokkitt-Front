import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

    constructor (public authService : AuthentificationService) {

    }

    ngOnInit(): void {
      
    }
    logout() : void {
      this.authService.logout()
    }
}
