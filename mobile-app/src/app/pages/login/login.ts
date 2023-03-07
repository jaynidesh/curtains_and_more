import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;
  errorMessage = '';
  isAdmin = false;
  constructor(
    public userData: UserData,
    public router: Router,
    private authService : AuthService
  ) { }

  onLogin(value: NgForm) {
    this.submitted = true;

    if (value.valid) {

      this.authService.loginUser(this.login);
    }
  };



  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
