import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TripService } from '../services/trip.service';
import { DatePipe } from '@angular/common';
import { TmpTripDataService } from '../services/tmp-trip-data.service';
import { PopupGenericComponent } from '../component/popup-generic/popup-generic.component';
import { MatDialog } from '@angular/material/dialog';
import { GetTokenService } from '../services/get-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe],
})

export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource: any;
  public displayedColumns = ["id"];
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Mermoz", "Pikine", "Tambacounda", "Tambacounda"];
  public tmpDate: string = "";

  filterValues = {
    departure: '',
    destination: ''
  };

  constructor(private router: Router, private cdr: ChangeDetectorRef,
    private tripService: TripService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private tripDataService: TmpTripDataService,
    private getToken: GetTokenService,
  ) {
  }

  updateHeaders(data : any): void {
    // console.log(data)
    data.forEach((element : any) => {
      if (this.tmpDate !== element.date) {
        element['showHeader'] = true;
        this.tmpDate = element.date;
      } else {
        element['showHeader'] = false;
      }
    });
    return data
  }

  updateDate(elementDate: string) : boolean{
    // console.log("helllo")

    if (this.tmpDate != elementDate) {
      this.tmpDate = elementDate;
      return true
    }
    return false
  }

  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions = new Observable<string[]>;
  filteredOptions2 = new Observable<string[]>;

  async ngOnInit() {

    const suggestData = localStorage.getItem('suggestData')
    if (suggestData != null) {
      localStorage.removeItem('suggestData')
      this.openGenericDialog()
      const dataJson = await JSON.parse(suggestData);
      this.pushData(dataJson)
    }

    this.loadAndInitTrips()

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  pushData(body : any): Promise<void> {
    body.id_client = this.getToken.getId()
    return new Promise((resolve, reject) => {
      this.tripService.createRequestTrip(body).subscribe(
        (data) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  openGenericDialog(): void {
    const dialogRef = this.dialog.open(PopupGenericComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Received data:', result);
    });
  }


  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.getAllTrips().subscribe(
        (data) => {
          data = this.updateHeaders(data.data)
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.filterPredicate = this.createFilter();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          resolve();  
        },
        (error) => {
          this.dataSource = new MatTableDataSource([]);
          // console.error('Error fetching trip:', error);
          reject(error);
        }
      );
    });
  }
  
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}`;
  }

  private _filter(value: string): string[] {
    // console.log(this.dataSource)
    const filterValue = value.toLowerCase();

    return this.city.filter(option => option.toLowerCase().includes(filterValue));
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data :any, filter: string): boolean => {

      const searchTerms = JSON.parse(filter);
      return data.departure.toLowerCase().indexOf(searchTerms.departure.toLowerCase()) !== -1
        && data.destination.toLowerCase().indexOf(searchTerms.destination.toLowerCase()) !== -1;
    };
    return filterFunction;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();

  }

  filterTraject(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  onCardClick(traject: any) {
    this.tripDataService.setTmpTrip(traject);
    this.router.navigate(['/trip', traject.id]);
  }
}

