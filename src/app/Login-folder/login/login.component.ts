import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
import { LogDialogComponent } from '../../log-dialog/log-dialog.component';
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginFormGroup!: FormGroup;
  public isSubscribe: boolean = true;
  private tripId: number | undefined;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private authservice: AuthentificationService,
    private router: Router,
    private route: ActivatedRoute,

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
    let phoneNumber: string = this.signupObj.phoneNumber;
    let password: string = this.signupObj.password;
    let firstName: string = this.signupObj.firstName;
    let lastName: string = this.signupObj.lastName;
    let role: string = "USER";

    this.authservice.register(firstName, lastName, phoneNumber, password, role).then((userData) => {
      // console.log("Utilisateur est inscrit : ", userData);
      this.router.navigateByUrl("/home")
    }).catch((error) => {
      // console.error("Échec de lors de l'inscription : ", error);
      this.dialog.open(LogDialogComponent)
    });
  }

  checkIfInProcess() {
    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('id')!;
      // console.log("reee = ", this.tripId)
      if (this.tripId != undefined) {
        // this.loadAndInitTrips(this.tripId)
        this.router.navigate(["/reservation", this.tripId]);

      } else {
        this.router.navigateByUrl("/home")
      }
    });
  }

  onLoginClient(): void {
    // console.log(this.loginObj)
    let phoneNumber: string = this.loginObj.phoneNumber;
    let password: string = this.loginObj.password;
    let role: string = "USER";


    this.authservice.login(phoneNumber, password, role).then((userData) => {
      // console.log("Utilisateur authentifié : ", userData);

    this.checkIfInProcess()
    }).catch((error) => {
      // console.error("Échec de l'authentification : ", error);
      this.dialog.open(LogDialogComponent)
    });

    // console.log(phoneNumber, password)
  }
}
