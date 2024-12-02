import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogDialogComponent } from '../log-dialog/log-dialog.component';
import { TripService } from '../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationDataService } from '../services/registration-data.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-check-number',
  templateUrl: './check-number.component.html',
  styleUrl: './check-number.component.css'
})
export class CheckNumberComponent implements OnInit {

  tryCode: string = ""
  checkId: number | undefined;
  role: string = ""
  phoneNumber: string = ''
  isValidCode = true

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    private registrationDataService: RegistrationDataService,
    private authservice: AuthentificationService,
  ) {

  }

  pushRegister() : void {
    const userInfo = this.registrationDataService.getData('userInfo')

    this.authservice.register(userInfo.firstName, userInfo.lastName, userInfo.phoneNumber, userInfo.password, userInfo.role).then((userData) => {
      this.router.navigateByUrl(userInfo.role == "USER" ? "home" : "driver-dashboard")
    }).catch((error) => {
      console.error("Échec server register", error);
      // this.dialog.open(LogDialogComponent)
    });
  }

  sendCode(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.generateCheckCode({ phoneNumber : this.phoneNumber}).subscribe(
        (data) => {
          this.checkId = data.id
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  checkCode(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(this.tryCode)
      this.tripService.verifyCheckCode(
        {
          id: this.checkId,
          resetCode: this.tryCode,
        }
      ).subscribe(
        (data) => {
          // localStorage.setItem('token', data.token);
          this.pushRegister()
          resolve();
        },
        (error) => {
          console.log("Échec de lors de la verificaton de code ")
          this.isValidCode = false
          reject(error);
        }
      );
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.phoneNumber = params.get('number')!;
      this.role = params.get('role')!;
      this.sendCode()
    });
  }

}