import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
// import { ValidationControl } from '../model/validation.model';
import { ApiService } from '../services/api.service';
import { LoginResponse } from '../model/login.model';
import { take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rollPattern = "[0-9]{6}"
  loginForm?: FormGroup;

  constructor(private router: Router, private apiService: ApiService, private cookieServie: CookieService) {

  }


  ngOnInit(): void {

  }

  loginResponse?: LoginResponse

  signIn(username: any, password: any) {
    console.log(username)

    this.apiService.adminLogin(username, password).pipe(take(1)).subscribe({
      next: (response) => {
        this.loginResponse = response;
        // console.log(this.loginResponse)
        if (this.loginResponse.data != null) {
          this.cookieServie.set('id', this.loginResponse.data.id.toString())
          this.cookieServie.set('token', this.loginResponse.data.token.toString())
          alert("login successful")
          this.router.navigate(['home'], { replaceUrl: true})
        }else{
          alert("invalid username/password")
        }
      }
    });
  }


}
