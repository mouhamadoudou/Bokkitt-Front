import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AfriCar';

  ngOnInit(): void {
    initFlowbite();
  }
}
