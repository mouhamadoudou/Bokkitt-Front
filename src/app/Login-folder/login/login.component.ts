import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
import { LogDialogComponent } from '../../log-dialog/log-dialog.component';
import { MatDialog } from '@angular/material/dialog'
import { RegistrationDataService } from '../../services/registration-data.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginFormGroup!: FormGroup;
  public isSubscribe: boolean = true;
  public isSamePassword = true;
  public isExistNumber = false;

  constructor(
    private registrationDataService: RegistrationDataService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private tripService: TripService,
    private authservice: AuthentificationService,
    private router: Router) {

  }
  public signUpForm!: FormGroup;
  public logForm!: FormGroup;


  countryCodes = [
    { name: 'Guinee Conakry', code: '+224' },
    { name: 'Mali', code: '+223' },
    { name: 'Senegal', code: '+221' },
    { name: 'Mauritanie', code: '+222' },
    { name: 'Gambie', code: '+220' },
    { name: 'Guinee Bissau', code: '+245' },
  ];

  public signUpUser: any[] = []

  ngOnInit(): void {

    function noSpecialCharactersValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = /^[a-zA-ZÀ-ÿ\s]+$/.test(control.value);
        return isValid ? null : { 'noSpecialCharactersOrNumbers': { value: control.value } };
      };
    }

    this.logForm = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      selectedCountryCode: ['+221'],

    })

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, noSpecialCharactersValidator()]],
      lastName: ['', [Validators.required, noSpecialCharactersValidator()]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]
      ],
      selectedCountryCode: ['+221'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }

  checkIfExiste(phoneNumber: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.checkIfNumberExist("clients", phoneNumber).subscribe(
        (data) => {
          reject();
        },
        (error) => {
          resolve();
        }
      );
    });
  }

  async onSignUp() {
    console.log(this.signUpForm.value.confirmPassword, " $$ ", this.signUpForm.value.password)
    if (this.signUpForm.value.confirmPassword == this.signUpForm.value.password) {

      await this.checkIfExiste(
        this.signUpForm.value.selectedCountryCode.replace("+", "") + this.signUpForm.value.phoneNumber
      )
        .then(() => {
          const userData = {
            phoneNumber: this.signUpForm.value.selectedCountryCode.replace("+", "") + this.signUpForm.value.phoneNumber,
            password: this.signUpForm.value.password,
            firstName: this.signUpForm.value.firstName,
            lastName: this.signUpForm.value.lastName,
            role: "USER"
          }
          console.log("== === ", userData)
          this.registrationDataService.setData('userInfo', userData);
          this.router.navigate(['check-number', userData.phoneNumber, "clients"]);
        })
        .catch((error) => {
          this.isExistNumber = true;
        });

    } else {
      this.isSamePassword = false
    }

  }

  forgotPassword(): void {
    this.router.navigate(['forgot-password', "clients"]);
  }

  onLoginClient(): void {
    let phoneNumber: string = (this.logForm.value.selectedCountryCode.replace("+", "") + this.logForm.value.phoneNumber);
    let password: string = this.logForm.value.password;
    let role: string = "USER";

    console.log("phone dddddddddddd== ", phoneNumber, "   ",  this.logForm.value)
    console.log("password == ", password)

    this.authservice.login(phoneNumber, password, role).then((userData) => {
      this.router.navigateByUrl("/home")
    }).catch((error) => {
      this.dialog.open(LogDialogComponent)
    });

    // console.log(phoneNumber, password)
  }
}
