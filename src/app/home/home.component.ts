import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


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
  public dataSource : any;
  public displayedColumns = ["id"];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  public city = ["Dakar", "Thies", "Mbour", "Saly", "Mermoz", "Pikine"]; 
  public client = ["Mohammed", undefined]; 

  filterValues = {
    depart: 'Dakar',
    destination: 'Saly'
  };

  constructor (private router : Router) {

  }

  ngOnInit(): void {
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

  filterStudent(event: Event) :void {
    // let value = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  getPayments(students : any) : void {
    this.router.navigateByUrl("/payments")
  }

  onCardClick(element: any) {

  }
}


// johhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
// import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { Router } from '@angular/router';
// import { first } from 'rxjs';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })

// export class HomeComponent implements OnInit, AfterViewInit {
//   public cards : any;
//   public dataSource : any;
//   public city = ["Dakar", "Thies", "Mbour", "Saly", "Mermoz", "Pikine"]; 
//   @ViewChild(MatPaginator) paginator! : MatPaginator;
//   @ViewChild(MatSort) sort! : MatSort;


//   constructor (private router : Router) {

//   }

//   ngOnInit(): void {
//     this.cards = [];

    
    
//     for (let i = 1; i < 10; i++) {
//       this.cards.push(
//         {
//           depart : this.city[Math.floor(Math.random() * this.city.length)],
//           destination: this.city[Math.floor(Math.random() * this.city.length)],
//           img : "https://www.photo-paysage.com/albums/userpics/10001/thumb_Crepuscule_sur_le_lac_Leman.jpg",
//           date : "10/07/2024",
//           description : "Trajet demain a 11h depart de dakar vers thies heure de rendez \nvous a 13h30",
//           payemnts : null,
//         }
//       )
//     }
//     this.dataSource = new MatTableDataSource(this.cards)
//   }

//   ngAfterViewInit(): void {
//     this.dataSource.paginator = this.paginator;
//     console.log(this.dataSource.paginator)
//     this.dataSource.sort = this.sort;
//   }

//   filterStudent(event: Event) :void {
//     let value = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = value;
//   }

//   getPayments(cards : any) : void {
//     this.router.navigateByUrl("/payments")
//   }

//   clickOne() {
//     console.log("ok")
//   }

// }
