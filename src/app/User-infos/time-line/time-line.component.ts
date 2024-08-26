import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent {
  timelineItems = [
    { title: 'Item 1', isOpen: false },
    { title: 'Item 2', isOpen: false },
    { title: 'Item 3', isOpen: false }
  ];

  constructor (private router : Router) {

  }

  toggleOpen(item: any) {
    item.isOpen = !item.isOpen;
  }

  myTrip () : void {
    console.log("hello world")
    this.router.navigate(['my-trip']);
  }
}
