import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterViewInit {
  public students : any;
  public dataSource : any;
  public displayedColumns = ["id"];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;


  constructor (private router : Router) {

  }

  ngOnInit(): void {
    this.students = [];
    
    for (let i = 1; i < 100; i++) {
      this.students.push(
        {
          id : i,
          firstName : Math.random().toString(20),
          payemnts : null,
        }
      )
    }
    this.dataSource = new MatTableDataSource(this.students)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterStudent(event: Event) :void {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
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
