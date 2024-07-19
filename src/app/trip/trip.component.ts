import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.trajectData = this.dataService.getData();
    console.log(this.trajectData)
    if (!this.trajectData) {
      console.error("error : data");
    }
  }

  ngAfterViewInit() {
    this.startStepper();
  }

  startStepper() {
    // setTimeout(() => {
    //   this.stepper.next();
    //   setTimeout(() => {
    //     this.stepper.next();
    //     setTimeout(() => {
    //       this.stepper.reset();
    //       this.startStepper()
    //     }, 3000);
    //   }, 3000);
    // }, 3000);
  }
}
