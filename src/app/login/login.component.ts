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

  login() :void {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    let auth = this.authservice.login(username, password);

    if (auth == true) {
      this.router.navigateByUrl("/admin/home")
    } 
    console.log(username, password)
  }
}
