import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../component/popup/popup.component';
import { TripService } from '../services/trip.service';
import { GetTokenService } from '../services/get-token.service';


export interface Traject {
  id: number;
  departure: string;
  destination: string;
  date: string,
  time: string,
  chair: number,
  isSubscribe: boolean,
}

@Component({
  selector: 'app-ride-request-list',
  templateUrl: './ride-request-list.component.html',
  styleUrl: './ride-request-list.component.css'
})
export class RideRequestListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource: any;
  public displayedColumns = ["id"];
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Tambacounda", "Tambacounda", "Mermoz", "Pikine"];
  public client = ["Mohammed", undefined];
  public completed = [true, false, true];
  public tmpDate: string = "";
  public clientRequestList: any = [];

  filterValues = {
    departure: '',
    destination: ''
  };

  constructor(private router: Router,
    private _snackBar: MatSnackBar, public dialog: MatDialog,
    private tripService: TripService,
    private getToken: GetTokenService
  ) {
  }

  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions = new Observable<string[]>;
  filteredOptions2 = new Observable<string[]>;

  ngOnInit(): void {
    this.loadAndInitRequest()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // const traject: Traject[] = [];
    // for (let i = 1; i < 100; i++) {
    //   traject.push(
    //     {
    //       id : i,
    //       departure : this.city[Math.floor(Math.random() * this.city.length)],
    //       destination: this.city[Math.floor(Math.random() * this.city.length)],
    //       date : i < 5 ? "Mercredi 10 Juillet" : "Mercredi 30 Juillet",
    //       time : "12h30",
    //       chair : 3,
    //       isSubscribe : i == 1 || i == 2 ? true : false
    //       }
    //   )
    // }
    // this.dataSource = new MatTableDataSource(traject)
    // this.dataSource.filterPredicate = this.createFilter();
  }

  cancelClienTriprequests(triprequest_id: string) {
    const body = {
      client_id: this.getToken.getId(),
      triprequest_id: triprequest_id
    }

    // console.log("heolooooooooo worldddddddd")
    return new Promise((resolve, reject) => {
      this.tripService.cancelClienTriprequests(body).subscribe(
        (data) => {
          resolve("ok");
          this.getClientRequest()
          this.loadAndInitRequest()
        },
        (error) => {
          console.error('Fail:', error);
          reject(error);
        }
      );
    });
  }

  addClienTripRequest(triprequest_id: string, nbPlaceRequest: string) {

    // console.log("lll ", triprequest_id)
    const body = {
      client_id: this.getToken.getId(),
      triprequest_id: triprequest_id,
      nbPlaceRequest: nbPlaceRequest
    }

    return new Promise((resolve, reject) => {
      this.tripService.addClienTriprequests(body).subscribe(
        (data) => {
          this.getClientRequest()
          this.loadAndInitRequest()
          resolve("ok");
        },
        (error) => {
          console.error('Fail:', error);
          reject(error);
        }
      );
    });
  }

  getClientRequest(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getClienttripRequestById(this.getToken.getId()).subscribe(
        (data) => {
          this.clientRequestList = data.data
          // console.log("dataa ok => ", this.clientRequestList)
          resolve();
        },
        (error) => {
          console.error('Error fetching trip request:', error);
          reject(error);
        }
      );
    });
  }

  loadAndInitRequest(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getAlltripRequest().subscribe(
        (data) => {
          // console.log(data.data)
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.filterPredicate = this.createFilter();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.getClientRequest()
          resolve();
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }

  updateTmpDate(newDate: string): void {
    this.tmpDate = newDate;
  }
  private _filter(value: string): string[] {
    // console.log(this.dataSource)
    const filterValue = value.toLowerCase();
    return this.city.filter(option => option.toLowerCase().includes(filterValue));
  }

  createFilter(): (data: Traject, filter: string) => boolean {
    const filterFunction = (data: Traject, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.departure.toLowerCase().indexOf(searchTerms.departure.toLowerCase()) !== -1
        && data.destination.toLowerCase().indexOf(searchTerms.destination.toLowerCase()) !== -1;
    };
    return filterFunction;
  }

  ngAfterViewInit(): void {
  }

  filterTraject(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  onCardClick(traject: any) {
    console.log(this.dataSource)
    this.router.navigate(['/trip']);
  }

  openDialog(component: {}): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: component
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Received data:', result);
      if (result.confirmed && result.type == "cancel") {
        this.cancelClienTriprequests(result.tripId)
      } else if (result.confirmed) {
        this.addClienTripRequest(result.tripId, result.selectedNbPlace)
      } else {
        // console.log("ok just cancel action")
      }
    });
  }
}

