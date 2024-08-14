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

  licenceName: string = 'Aucun permis sélectionné';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file)
    if (file) {
      this.licenceName = file.name;
    }
  }
}
