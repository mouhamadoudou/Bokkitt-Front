import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';
import { TripService } from '../../services/trip.service';

export interface Traject {
  id : number;
  depart: string;
  destination: string;
  date : string,
  time : string,
  chair : number,
}


@Component({
  selector: 'app-driver-ride-request',
  templateUrl: './driver-ride-request.component.html',
  styleUrl: './driver-ride-request.component.css'
})
export class DriverRideRequestComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  
  public dataSource : any;
  public displayedColumns = ["id"];
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Tambacounda", "Tambacounda", "Mermoz", "Pikine"]; 
  public client = ["Mohammed", undefined]; 
  public completed = [true, false, true]; 
  public tmpDate : string = "";


  filterValues = {
    departure: '',
    destination: ''
  };

  constructor (private router : Router,
    private _snackBar: MatSnackBar, public dialog: MatDialog,
    private tripService: TripService,
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
    //       depart : this.city[Math.floor(Math.random() * this.city.length)],
    //       destination: this.city[Math.floor(Math.random() * this.city.length)],
    //       date : i < 5 ? "Mercredi 10 Juillet" : "Mercredi 30 Juillet",
    //       time : "12h30",
    //       chair : 3,
    //       }
    //   )
    // }
    // this.dataSource = new MatTableDataSource(traject)
    // this.dataSource.filterPredicate = this.createFilter();
  }


  loadAndInitRequest(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getAlltripRequest().subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          resolve();
        },
        (error) => {
          console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }

  updateTmpDate (newDate : string) : void {
    this.tmpDate = newDate;
  }

  private _filter(value: string): string[] {
    console.log(this.dataSource)
    const filterValue = value.toLowerCase();

    return this.city.filter(option => option.toLowerCase().includes(filterValue));
  }

  createFilter(): (data: Traject, filter: string) => boolean {
    const filterFunction = (data: Traject, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.depart.toLowerCase().indexOf(searchTerms.depart.toLowerCase()) !== -1
         && data.destination.toLowerCase().indexOf(searchTerms.destination.toLowerCase()) !== -1;
    };
    return filterFunction;
  }
  
  ngAfterViewInit(): void {
  }   

  filterTraject() :void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddTrip(component : {}): void {
    this.router.navigate(['/add-trip'], { 
      queryParams: { key: 'id' } 
    });    
  }
}

