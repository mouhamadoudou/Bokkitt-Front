import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface Traject {
  depart: string;
  destination: string;
  date : string,
  time : string,
  clients : any,
  chair : number,
  price : number,
  smoke : false,
  bague : false,
  phone : false,
  payemnts : null,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  public dataSource : any;
  public displayedColumns = ["id"];
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Mermoz", "Pikine"]; 
  public client = ["Mohammed", undefined]; 
  filterValues = {
    depart: '',
    destination: ''
  };

  constructor (private router : Router) {

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
          depart : this.city[Math.floor(Math.random() * this.city.length)],
          destination: this.city[Math.floor(Math.random() * this.city.length)],
          date : "Mercredi 10 Juillet",
          time : "12h30",
          clients : ["Mohammed", "Abubakar", "Omar", undefined, undefined, undefined],
          chair : 3,
          price : 800 + Math.random() * 10000,
          smoke : false,
          bague : false,
          phone : false,
          payemnts : null,
        }
      )
    }
    this.dataSource = new MatTableDataSource(traject)
    this.dataSource.filterPredicate = this.createFilter();
  }

  private _filter(value: string): string[] {
    console.log(value)
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

  onCardClick(element: any) {
    // options = ()
    console.log(this.dataSource.data)
    // console.log("hello world : ")
    // console.log(element)
  }
}

