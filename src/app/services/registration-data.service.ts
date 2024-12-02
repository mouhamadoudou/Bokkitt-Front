import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {
  private data: any = {};

  setData(key: string, value: any): void {
    this.data[key] = value;
  }

  getData(key: string): any {
    return this.data[key];
  }

  clearData(): void {
    this.data = {};
  }
}
