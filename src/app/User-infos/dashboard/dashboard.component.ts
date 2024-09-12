import { Component } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeSection: string = 'profile';
  licenceName: string = 'Aucun permis sélectionné';
  // componentChange = ["phone", "passworld", "firstName", "lastName", "old", "sex", "city" ];

  activateSection(section: any): void {
    this.activeSection = section;
  }

  constructor (public authService : AuthentificationService, private router: Router) {
  }


}
