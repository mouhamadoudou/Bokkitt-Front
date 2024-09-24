import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../component/popup/popup.component';



export interface Traject {
  id : number;
  depart: string;
  destination: string;
  date : string,
  time : string,
  chair : number,
}


@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.css'
})
export class DriverDashboardComponent implements OnInit, AfterViewInit {

  public dataSource : any;
  public displayedColumns = ["id"];
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Tambacounda", "Tambacounda", "Mermoz", "Pikine"]; 
  public client = ["Mohammed", undefined]; 
  public completed = [true, false, true]; 
  public tmpDate : string = "";


  constructor (private router : Router,
    private _snackBar: MatSnackBar, public dialog: MatDialog) {
  }
  
  
  ngOnInit(): void {
    
    const traject: Traject[] = [];
    for (let i = 1; i < 5; i++) {
      traject.push(
        {
          id : i,
          depart : this.city[Math.floor(Math.random() * this.city.length)],
          destination: this.city[Math.floor(Math.random() * this.city.length)],
          date : i == 1 || i == 2 ? "Mercredi 10 Juillet" : "Mercredi 20 Juillet" ,
          time : "12h30",
          chair : 3
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

  updateTmpDate (newDate : string) : void {
    this.tmpDate = newDate;
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


  onCardClick(traject: any) {
    this.router.navigate(['/trip']);
  }
}

