import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewPasswordComponent } from '../new-password/new-password.component'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  genders = ["Homme", "Femme"];
  selectedGender: string = 'Homme';
  nbPlace = [1 , 2, 3, 4, 5, 6];
  selectedNbPlace: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close({ confirmed: true });
  }

}
