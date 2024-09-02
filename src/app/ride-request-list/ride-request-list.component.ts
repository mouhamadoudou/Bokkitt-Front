import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../component/popup/popup.component';


export interface Traject {
  id : number;
  depart: string;
  destination: string;
  date : string,
  time : string,
  chair : number,
  isSubscribe : boolean,
}

@Component({
  selector: 'app-ride-request-list',
  templateUrl: './ride-request-list.component.html',
  styleUrl: './ride-request-list.component.css'
})
export class RideRequestListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  
  public dataSource : any;
  public displayedColumns = ["id"];
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Tambacounda", "Tambacounda", "Mermoz", "Pikine"]; 
  public client = ["Mohammed", undefined]; 
  public completed = [true, false, true]; 


  filterValues = {
    depart: '',
    destination: ''
  };

  constructor (private router : Router, private dataService: DataService, 
    private _snackBar: MatSnackBar, public dialog: MatDialog) {
  }
  
  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions = new Observable<string[]>;
  filteredOptions2 = new Observable<string[]>;
  
  ngOnInit(): void {
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    const traject: Traject[] = [];
    for (let i = 1; i < 100; i++) {
      traject.push(
        {
          id : i,
          depart : this.city[Math.floor(Math.random() * this.city.length)],
          destination: this.city[Math.floor(Math.random() * this.city.length)],
          date : "Mercredi 10 Juillet",
          time : "12h30",
          chair : 3,
          isSubscribe : i == 1 || i == 2 ? true : false
          }
      )
    }
    this.dataSource = new MatTableDataSource(traject)
    this.dataSource.filterPredicate = this.createFilter();
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }   

  filterTraject() :void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  onCardClick(traject: any) {
    // console.log(this.dataSource)
    this.dataService.setData(traject)
    this.router.navigate(['/trip']);
  }

  openDialog(component : {}): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received data:', result);
    });
  }
}

