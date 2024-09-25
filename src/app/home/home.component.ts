import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TripService } from '../services/trip.service';
import { DatePipe } from '@angular/common';

export interface Traject {
  bag: boolean,
  bagcap: string,
  bagpay: string,
  date: string,
  departure: string,
  departuredesc: string,
  destination: string,
  destinationdesc: string,
  driverid: number,
  id: number,
  isfull: boolean,
  phonenumber: string,
  price: string,
  seat: number,
  smoke: boolean,
  time: string
}

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
  public client = ["Mohammed", undefined];
  public completed = [true, false, true];
  public tmpDate: string = "";

  filterValues = {
    departure: '',
    destination: ''
  };

  constructor(private router: Router, private cdr: ChangeDetectorRef,
    private tripService: TripService,
    private datePipe: DatePipe
  ) {
  }

  updateDate(elementDate: string) {
    this.tmpDate = elementDate;
    // console.log(this.tmpDate)
  }

  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions = new Observable<string[]>;
  filteredOptions2 = new Observable<string[]>;

  ngOnInit(): void {

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

  loadAndInitTrips(): Promise<void> {
    return new Promise((resolve, reject) => {
      // this.loading = true; 
      this.tripService.getAllTrips().subscribe(
        (data) => {

          // console.log(data.data[0].date)
          // data = data.data.map((trip: Traject) => 
          //   this.datePipe.transform(trip.date, 'EEEE d MMMM', 'UTC')!
          // );
          console.log("hello ", data)
          this.dataSource = new MatTableDataSource(data.data);
          // this.dataSource.filterPredicate = this.createFilter();
          // this.loading = false; 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          resolve();
        },
        (error) => {
          console.error('Error fetching trips:', error);
          // this.loading = false; 
          reject(error);
        }
      );
    });
  }
  

  private _filter(value: string): string[] {
    // console.log(this.dataSource)
    const filterValue = value.toLowerCase();

    return this.city.filter(option => option.toLowerCase().includes(filterValue));
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data :any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      console.log(searchTerms)
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
    // console.log(this.dataSource)
    this.router.navigate(['/trip']);
  }
}

