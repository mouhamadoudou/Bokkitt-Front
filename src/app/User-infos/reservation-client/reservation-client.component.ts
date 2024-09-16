import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrl: './reservation-client.component.css'
})
export class ReservationClientComponent {
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
    this.router.navigate(['my-trip-client']);
  }
}
