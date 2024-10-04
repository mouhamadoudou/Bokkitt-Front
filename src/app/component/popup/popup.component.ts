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

  setCancel(confirmed : boolean) : void {
    // console.log("date ===0",  this.data.Element.id)
    this.dialogRef.close({ type : "cancel", confirmed: confirmed, tripId: this.data.Element.id });
  }

  setAddMe(confirmed : boolean): void {
    console.log("helooo wollll", confirmed)
    this.dialogRef.close({ selectedNbPlace: this.selectedNbPlace, confirmed: confirmed, tripId: this.data.Element.id  });
  }

}
