import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogDialogComponent } from '../../log-dialog/log-dialog.component';
import { TripService } from '../../services/trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {

  tryCode: string = ""
  checkId: number | undefined;
  role: string = ""
  phoneNumber: string = ''

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

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
      this.tripService.verifyResetCode(
        {
          id: this.checkId,
          resetCode: this.tryCode,
          role: this.role,
          phone_number: this.phoneNumber
        }
      ).subscribe(
        (data) => {
          // this.checkId = data.id
          console.log("okkk world ", data);

          localStorage.setItem('token', data.token);
          this.router.navigate(['change-password', this.role]);
          resolve();
        },
        (error) => {
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