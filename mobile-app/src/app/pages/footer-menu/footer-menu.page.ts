import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.page.html',
  styleUrls: ['./footer-menu.page.scss'],
})
export class FooterMenuPage implements OnInit {
  isLogin : boolean = false;
  constructor(
    private angularFireAuth : AngularFireAuth,
    public toastController: ToastController,
    public router : Router
  ) { }

  ngOnInit() {
    //console.log(this.angularFireAuth)
  }

  goToProfilePage(page){
    if(this.angularFireAuth.auth.currentUser != null){
      this.isLogin = true;
      
      this.router.navigateByUrl('/tabs/my-profile');
    }
    else{
      this.isLogin = false;
      this.presentToastNotLogin();
    }
    


  };

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  async presentToastNotLogin() {
    const toast = await this.toastController.create({
      message: 'Kindly note that you need to be signed in to unlock this feature.',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Sign In',
          role: 'info',
          handler: () => { 
            this.router.navigateByUrl('/login');
           }
        }
      ],
    });
    toast.present();
  }

}
