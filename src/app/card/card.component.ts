import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() cardData : any;
  @Output() editCard = new  EventEmitter<any>();
  @Output() deleteCard = new EventEmitter<any>();

  // onDelte
}
