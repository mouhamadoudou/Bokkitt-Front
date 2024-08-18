import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';

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

  // constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) { }


  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   console.log(file)
  //   if (file) {
  //     this.licenceName = file.name;
  //   }
  // }

  
  // openDialog(component : {}): void {
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     data: component
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log('Received data:', result);
  //   });
  // }


}
