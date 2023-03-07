

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';
import { Market } from "@ionic-native/market/ngx";
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-concierge-reservation',
  templateUrl: './concierge-reservation.page.html',
  styleUrls: ['./concierge-reservation.page.scss'],
})
export class ConciergeReservationPage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;

  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  menus;
  isLogin;
  constructor(
    private firebaseDataCollectionService: FirebaseDataCollectionService,
    private iab: InAppBrowser,
    public toastController : ToastController,
    public router : Router,
    public element: ElementRef,
    private angularFireAuth : AngularFireAuth,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.firebaseDataCollectionService.getAllMenu('concierge-reservation-contents').subscribe(data => {
      this.menus = data;
    });

  };


  goToLink(menu){

    if(this.angularFireAuth.auth.currentUser != null){
      this.isLogin = true;

      if(GlobalService.userDetails.status == "inactive"){
        this.presentToast('Your account is not active.');
      }
      else if(GlobalService.userDetails.access_type == "limited"){
        this.presentToast('Kindly note that this feature is only available for Privilege, Premium, Elite and Infinity Members.');
      }
      else{

      
        if(menu['external-link']){
          this.openLink(menu.link)
        }
        else{
          this.router.navigateByUrl(`${menu.link}`);
        }
      }

      

      
      
    }
    else{
        this.isLogin = false;
        this.presentToastNotLogin();
      }

    
  };

  openLink(link){

    const browser = this.iab.create(link, '_blank');
  };

  onContentScroll(event) {

    if (event.detail.scrollTop >= 100) {
    
    this.renderer.setStyle(this.header['el'], 'top', '0');
    
    this.renderer.setStyle(this.toolbar['el'], 'top', '0');
    
    // this.renderer.setStyle(this.header['el'], 'height', 'auto');
    
    } else {
    
    this.renderer.setStyle(this.header['el'], 'top', '-100px');
    
    this.renderer.setStyle(this.toolbar['el'], 'top', '-100px');
    
    // this.renderer.setStyle(this.header['el'], 'height', '40px');
    
    }
    
    }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
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
