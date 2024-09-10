import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion-driver',
  templateUrl: './connexion-driver.component.html',
  styleUrl: './connexion-driver.component.css'
})
export class ConnexionDriverComponent implements OnInit {

  public loginFormGroup! : FormGroup;
  public isSubscribe : boolean = true;

  constructor (private fb : FormBuilder, 
    private authservice : AuthentificationService,
    private router : Router) {

  }

  signupObj:any = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password:''
  }

  loginObj:any = {
    phoneNumber: '',
    password: ''
  }

  public signUpUser : any[] = []

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      firstName : this.fb.control(''),
      lastName: this.fb.control(''),
      phoneNumber : this.fb.control(''),
      city : this.fb.control(''),
 
 
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  onSignUp() :void {
    console.log(this.signupObj)
    this.signUpUser.push(this.signupObj)
    localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUser))
  }

  onLoginDriver() :void {
    console.log(this.loginObj)
    let phoneNumber = this.loginObj.phoneNumber;
    let password = this.loginObj.password;
    let auth = this.authservice.loginDriver(phoneNumber, password);

    if (auth == true) {
      this.router.navigateByUrl("/driver-dashboard")
      // this.router.navigate(['/']);
    } 
    console.log(phoneNumber, password)
  }

  onLoginClient() :void {
    console.log(this.loginObj)
    let phoneNumber = this.loginObj.phoneNumber;
    let password = this.loginObj.password;
    let auth = this.authservice.loginClient(phoneNumber, password);

    if (auth == true) {
      this.router.navigateByUrl("/home")
      // this.router.navigate(['/']);
    } 
    console.log(phoneNumber, password)
  }
}
