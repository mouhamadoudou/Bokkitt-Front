import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';
import { AuthentificationService } from '../../services/authentification.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-informations-client',
  templateUrl: './informations-client.component.html',
  styleUrl: './informations-client.component.css'
})
export class InformationsClientComponent {
  activeSection: string = 'profile';
  licenceName: string = 'Aucun permis sélectionné';

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog,
    public authService : AuthentificationService, private router: Router
  ) { }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file)
    if (file) {
      this.licenceName = file.name;
    }
  }

  
  openDialog(component : {}): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received data:', result);
    });
  }
}
