import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

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
  }

  onLogin() :void {
    console.log(this.loginObj)
    let phoneNumber = this.loginObj.phoneNumber;
    let password = this.loginObj.password;
    let auth = this.authservice.login(phoneNumber, password);

    if (auth == true) {
      this.router.navigateByUrl("/admin/home")
    } 
    console.log(phoneNumber, password)
  }
}
