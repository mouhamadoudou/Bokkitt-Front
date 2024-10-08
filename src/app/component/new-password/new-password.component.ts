import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { GetTokenService } from '../../services/get-token.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  passwordForm: FormGroup;
  newPassword : string = "";
  constructor(private fb: FormBuilder,
    private tripService: TripService,
    private getToken: GetTokenService
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if ( newPassword === confirmPassword ) {
      return  null;
    } else {
      return { passwordMismatch: true };
    }
  }

  updatePassword() {
    const body = {
      client_id: this.getToken.getId(),
     new_password: this.passwordForm.value.newPassword,
     role : "clients"
    }

    // console.log("heolooooooooo worldddddddd")
    return new Promise((resolve, reject) => {
      this.tripService.updateUserPassword(body).subscribe(
        (data) => {
          resolve("ok");
        },
        (error) => {
          console.error('Fail:', error);
          reject(error);
        }
      );
    });
  }


  tryUpdatePassword() {
    this.updatePassword()
  }
}
