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
  public displayedColumns = ["id", "firstName", "payments"];
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

}
