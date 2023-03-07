import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.page.html',
  styleUrls: ['./before-login.page.scss'],
})
export class BeforeLoginPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  };

  goToHomeAsVisitor(){
    this.router.navigateByUrl('/tabs/home');
  }

}
