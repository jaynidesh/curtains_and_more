import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { GlobalService } from '../../services/global.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;

@ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  userDetails;
  encodeData: any;
  elementType = 'text';
  qrWidth="300";
  createdCode;
  scannedData: {};
  userUUID;
  related_company;
  constructor(
    public authService: AuthService,
    public element: ElementRef,
    private angularFireAuth : AngularFireAuth,
    public renderer: Renderer2,
    public dataCollection : FirebaseDataCollectionService
  ) { }

  ngOnInit() {

    //console.log(this.angularFireAuth)
    //console.log(this.authService.userUid);

      this.userDetails = GlobalService.userDetails;
      this.createdCode = `https://merchant.leclub.mu/membership-info/${GlobalService.userID}`;

      if(this.userDetails.related_company){
        this.dataCollection.getRelatedCompanyLogo(this.userDetails.related_company).subscribe(data => {
          this.related_company = data;
        })
      }

    // this.authService.getUserDetails(GlobalService.userID).subscribe(user => {
    //   //console.log(user)
    //   this.userDetails = user;
    //   this.createdCode = this.userDetails.uid;

    // })
  }

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
