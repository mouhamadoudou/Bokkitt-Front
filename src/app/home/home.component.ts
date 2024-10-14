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
import { TripModel } from '../models/traject.model';
import { TmpTripDataService } from '../services/tmp-trip-data.service';

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
    private datePipe: DatePipe,
    private tripDataService: TmpTripDataService,
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
      this.tripService.getAllTrips().subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.filterPredicate = this.createFilter();
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

