import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  selectedCountryCode: string = '+221';
  phoneNumber: string = '';

  countryCodes = [
    { name: 'Guinee Conakry', code: '+224'},
    { name: 'Mali', code: '+223'},
    { name: 'Senegal', code: '+221'},
    { name: 'Mauritanie', code: '+222'},
    { name: 'Gambie', code: '+220'},
    { name: 'Guinee Bissau', code: '+245'},
  ];

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^0-9]/g, '');

    if (inputValue.length > 9) {
      inputValue = inputValue.slice(0, 9);
    }

    this.phoneNumber = inputValue.match(/.{1,3}/g)?.join('-') || '';

    inputElement.value = this.phoneNumber;
  }

  restrictInput(event: KeyboardEvent): boolean {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(event.key)) {
      return true;
    }
    return /\d/.test(event.key);
  }

  get fullPhoneNumber(): string {
    return `${this.selectedCountryCode} ${this.phoneNumber}`;
  }
}