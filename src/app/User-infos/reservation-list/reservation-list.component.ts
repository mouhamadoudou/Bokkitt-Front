import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  activeSection: string = 'profile';
  licenceName: string = 'Aucun permis sélectionné';

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) { }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file)
    if (file) {
      this.licenceName = file.name;
    }
  }


  openDialog(component: {}): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received data:', result);
    });
  }
}