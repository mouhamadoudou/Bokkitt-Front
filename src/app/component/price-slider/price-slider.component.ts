import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.css']
})
export class PriceSliderComponent {
  @Output() priceOnchange = new EventEmitter<string>();
  disabled = false;
  max = 50000;
  min = 500;
  showTicks = false;
  step = 100;
  thumbLabel = false;
  value = 500;

  increment() {
    this.value += 50;
    this.onPriceChange(this.value);
  }

  decrement() {
    if (this.value > this.min) {
      this.value -= 50;
      this.onPriceChange(this.value);
    }
  }

  onPriceChange(price: number) {
    const res = price.toString();
    this.priceOnchange.emit(res);
  }
}
