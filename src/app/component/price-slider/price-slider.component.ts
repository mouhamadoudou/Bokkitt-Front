import { Component } from '@angular/core';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrl: './price-slider.component.css'
})
export class PriceSliderComponent {
  disabled = false;
  max = 50000;
  min = 500;
  showTicks = false;
  step = 100;
  thumbLabel = false;
  value = 500;


  increment() {
    this.value += 50;
  }

  decrement() {
    this.value -= 50;
  }
}


