import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-load-students',
  templateUrl: './load-students.component.html',
  styleUrl: './load-students.component.css'
})
export class LoadStudentsComponent implements OnInit, AfterViewInit {
  public students : any;
  public dataSource : any;
  public products: any;
  
  public displayedColumns = ["id", "firstName", "lastName", "payments"];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;


  constructor (private router : Router, private productService: ProductsService) {

  }

  ngOnInit(): void {
    this.students = [];
    this.products= [];
    // console.log(this.productService.getAllProducts())

    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data; // Assign data to products array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
    console.log(this.products)
    for (let i = 1; i < 100; i++) {
      this.students.push(
        {
          id : i,
          firstName : Math.random().toString(20),
          lastName : Math.random().toString(20),
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