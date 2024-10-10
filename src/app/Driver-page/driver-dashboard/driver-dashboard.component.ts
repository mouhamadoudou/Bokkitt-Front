import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.css'
})
export class DriverDashboardComponent implements OnInit {
  dataSource = [];
  tmpData: any = {}
  today: any;
  tmpDate: string = ''
  public displayedColumns = ["id"];

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

  checkDate(date: string) {
    if (this.today > new Date(date)) {
      return false
    }
    return true;
  }

  updateTmpDate(newDate: string): void {
    this.tmpDate = newDate;
  }

  setTmpData(item: any) {
    this.tmpData = item
  }

  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      const date = new Date(this.today);
      const formattedDate = date.toISOString().split('T')[0];

      this.tripService.getDriverNextTrip5(this.getToken.getId(), formattedDate).subscribe(
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
}