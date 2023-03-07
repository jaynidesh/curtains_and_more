import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../..//services/global.service';
import * as firebase from 'firebase';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  @ViewChild("header", {static: false}) header: HTMLElement;
  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;

  content;
  selectOptions = {
    header: 'Select a Location'
  };

  constructor(
    public popoverCtrl: PopoverController, 
    private iab: InAppBrowser,
    public element: ElementRef,
    public renderer: Renderer2,
    public dataCollection : FirebaseDataCollectionService,
    private storage : Storage,
    public authService : AuthService) { 
    
      this.dataCollection.getAboutUsContent().subscribe(data => {
        this.content = data;
      });

      //console.log(GlobalService)
      //console.log(firebase.auth().currentUser)
      //console.log(this.authService.userDetails())
    }

    ngOnInit() {
      // set get menu here
      
      this.storage.get('aboutUsContent').then(res => {
        this.content =res;
      });

      this.dataCollection.getAboutUsContent().subscribe(data => {
        this.content = data;
        this.storage.set('aboutUsContent', data);
      })
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
}
