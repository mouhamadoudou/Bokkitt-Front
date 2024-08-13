import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeSection: string = 'profile';

  activateSection(section: string): void {
    this.activeSection = section;
  }

  insertLicense() {
    
  }
}
