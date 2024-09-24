import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
import { LogDialogComponent } from '../../log-dialog/log-dialog.component';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginFormGroup!: FormGroup;
  public isSubscribe: boolean = true;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private authservice: AuthentificationService,
    private router: Router,
  ) {

  }

  signupObj: any = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: ''
  }

  loginObj: any = {
    phoneNumber: '',
    password: ''
  }

  public signUpUser: any[] = []
  data: any;
  ngOnInit(): void {
    // this.loginFormGroup = this.fb.group({
    //   firstName: this.fb.control(''),
    //   lastName: this.fb.control(''),
    //   phoneNumber: this.fb.control(''),
    //   city: this.fb.control(''),

    //   username: this.fb.control(''),
    //   password: this.fb.control('')
    // });
  }

  onSignUp(): void {
    let phoneNumber : string = this.signupObj.phoneNumber;
    let password : string = this.signupObj.password;
    let firstName : string = this.signupObj.firstName;
    let lastName : string = this.signupObj.lastName;
    let role :string = "USER";

    this.authservice.register(firstName, "NiangTMP", phoneNumber, password, role).then((userData) => {
      console.log("Utilisateur est inscrit : ", userData);
      this.router.navigateByUrl("/home")
    }).catch((error) => {
      console.error("Échec de lors de l'inscription : ", error);
      this.dialog.open(LogDialogComponent)
    });
  }

  onLoginClient(): void {
    console.log(this.loginObj)
    let phoneNumber : string = this.loginObj.phoneNumber;
    let password : string = this.loginObj.password;
    let role : string = "USER";

    this.authservice.login(phoneNumber, password, role).then((userData) => {
      console.log("Utilisateur authentifié : ", userData);
      this.router.navigateByUrl("/home")
    }).catch((error) => {
      console.error("Échec de l'authentification : ", error);
      this.dialog.open(LogDialogComponent)
    });

    console.log(phoneNumber, password)
  }
}
