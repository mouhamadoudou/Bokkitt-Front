import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  newPassword1: string = '';
  newPassword2: string = '';
  phoneNumber: string = '';
  role : string = '';

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role')!;
    });
  }
  // {
  //   "role" : "clients",
  //   "phone_number" : "1",
  //   "new_value" : "1"
  // }
  pushNewPassword(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tripService.updatePassword({ role : "clients", phoneNumber: this.phoneNumber, new_value : this.newPassword1}).subscribe(
        (data) => {
          // this.checkId = data.id
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  onClickSend () {
    console.log("helloo worlllll")
    console.log(this.newPassword1 === this.newPassword2 , this.newPassword1, " and ", this.newPassword2 )
    if (this.newPassword1 === this.newPassword2 ) {
      this.pushNewPassword()
      this.router.navigate([this.role == 'driver' ? 'driver-dashboard' : "home"]);
    } else {
      console.log("Error les deux mot de passe ne correspond pas")
    }
  }
}