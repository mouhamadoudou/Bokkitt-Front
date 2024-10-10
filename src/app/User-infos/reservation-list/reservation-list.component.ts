import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  activeSection: string = 'profile';
  licenceName: string = 'Aucun permis sélectionné';
  dataSource = [];
  tmpData : any = {}
  today : any;

  constructor(private _snackBar: MatSnackBar, 
    public dialog: MatDialog,
    private tripService: TripService,
    private router: Router,
    private getToken: GetTokenService) {

    const currentDate = new Date();
    this.today = new Date(currentDate.toLocaleDateString()); 
  }

  ngOnInit(): void {
    this.dataSource = []
    this.loadAndInitTrips()
    console.log(this.dataSource)
  }

  checkDate(date : string) {
    if (this.today > new Date(date)) {
      return false 
    }
    return true;
  }

  setTmpData (item : any) {
    this.tmpData = item
  }

  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getDriverHistoryById(this.getToken.getId()).subscribe(
        (data) => {
          this.dataSource = data.data
          console.log("dataaaaaa == ", this.dataSource)
          resolve();  
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
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

  myTrip () : void {
    console.log("hello world")
    this.router.navigate(['my-trip']);
  }
}
