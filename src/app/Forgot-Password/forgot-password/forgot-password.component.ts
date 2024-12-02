import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  selectedCountryCode: string = '+221';
  phoneNumber: string = '';
  role : string = '';
  newPassword1: string = '';
  newPassword2: string = '';
  isValidPhoneNumber = true;

  countryCodes = [
    { name: 'Guinee Conakry', code: '+224'},
    { name: 'Mali', code: '+223'},
    { name: 'Senegal', code: '+221'},
    { name: 'Mauritanie', code: '+222'},
    { name: 'Gambie', code: '+220'},
    { name: 'Guinee Bissau', code: '+245'},
  ];

  constructor(
    private router: Router,
    private tripService: TripService,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role')!;
    });
  }

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

  checkIfExiste(phoneNumber: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.checkIfNumberExist(this.role, phoneNumber).subscribe(
        (data) => {
          resolve();
        },
        (error) => {
          reject();
        }
      );
    });
  }

  async checkNumber(phoneNumber : string) {
    await this.checkIfExiste( phoneNumber)
      .then(() => {
        this.router.navigate(['verification', this.phoneNumber, this.role]);
      })
      .catch((error) => {
        this.isValidPhoneNumber = false;
      });

  } 

  onClickSend () {
    this.phoneNumber = this.selectedCountryCode.replace("+", "") +  this.phoneNumber.replace(/-/g, "");
    console.log("new == ", this.phoneNumber)
    this.checkNumber(this.phoneNumber)
  }
}