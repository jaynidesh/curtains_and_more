
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';
import { Market } from "@ionic-native/market/ngx";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-your-privileges',
  templateUrl: './your-privileges.page.html',
  styleUrls: ['./your-privileges.page.scss'],
})
export class YourPrivilegesPage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;

@ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  menus;
  constructor(
    private firebaseDataCollectionService: FirebaseDataCollectionService,
    private iab: InAppBrowser,
    public toastController : ToastController,
    public router : Router,
    private storage : Storage,
    public element: ElementRef,

    public renderer: Renderer2
  ) { }

  ngOnInit() {
    // set get menu here

    this.storage.get('privileges').then(res => {
      this.menus =res;
    });
    this.firebaseDataCollectionService.getAllMenu('privileges-contents').subscribe(data => {
      //console.log(data)
      this.menus = data;
      this.storage.set('privileges', data);
    });
  };

  goToLink(menu, index){
    //console.log(menu);

    if(menu['externalLink']){
      this.openLink(menu.link)
    }
    else{

      this.router.navigateByUrl(`${menu.link}/${index}`);
    }

  }

  openLink(link){

    const browser = this.iab.create(link, '_blank');
  };

  


  // launchMarket() {
  //   let playStore = this.links.traduction.playstore;
  //   let appStore = this.links.traduction.appstore;
  //   let appId;
  //   if (this.platform.is("ios")) {
  //     appId = appStore;
  //   } else {
  //     appId = playStore;
  //   }

  //   this.market
  //     .open(appId)
  //     .then(() => {})
  //     .catch((error: any) => {
  //       this.presentToast('Error opening app store')
  //     });
  // };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position : "top"
    });
    toast.present();
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
    
    };
}
