import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') private stepper!: MatStepper;
  trajectData: any;

  constructor(private dataService: DataService, private router: Router, public authService: AuthentificationService) { }

  ngOnInit(): void {
    this.trajectData = this.dataService.getData();
    console.log(this.trajectData)
    if (!this.trajectData) {
      console.error("error : data");
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
    this.startStepper();
  }

  onClickReserved() {
    if (this.authService.authentificated) {
      this.router.navigateByUrl("reservation")
    } else {
      this.router.navigateByUrl("login")
    }
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
