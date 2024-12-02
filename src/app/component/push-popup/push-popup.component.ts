import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';

@Component({
  selector: 'app-push-popup',
  templateUrl: './push-popup.component.html',
  styleUrl: './push-popup.component.css'
})

export class PushPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PushPopupComponent>,
    private tripService: TripService,
    private getToken: GetTokenService,

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 4000);
  }

  pushData() {
    this.data.driverid = this.getToken.getId()
    // console.log("bodyyyyy == ", this.data)
    return new Promise((resolve, reject) => {
      this.tripService.createTrip(this.data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  onClose() {
    this.pushData()
    localStorage.removeItem("tripData");
    this.dialogRef.close("result");
  }
}
