import { Component } from '@angular/core';

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

  toggleOpen(item: any) {
    item.isOpen = !item.isOpen;
  }
}
