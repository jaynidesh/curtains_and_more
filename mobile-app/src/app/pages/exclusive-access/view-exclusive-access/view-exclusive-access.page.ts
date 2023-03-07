
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataCollectionService } from '../../../services/firebase-data-collection.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GlobalService } from '../../../services/global.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-view-exclusive-access',
  templateUrl: './view-exclusive-access.page.html',
  styleUrls: ['./view-exclusive-access.page.scss'],
})
export class ViewExclusiveAccessPage implements OnInit {

  @ViewChild("header", {static: false}) header: HTMLElement;

@ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  pageContent;
  isLogin;
  constructor(
    public dataCollection : FirebaseDataCollectionService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public element: ElementRef,
    private iab: InAppBrowser,
    public renderer: Renderer2,
    private angularFireAuth : AngularFireAuth,
    public toastController : ToastController
  ) { }

  ngOnInit() {
    console.log
    // use this resolver
    // https://ionicacademy.com/pass-data-angular-router-ionic-4/
    // this.route.queryParams.subscribe(params => {
    //   //console.log(params)
    //   if (params && params.id) {
    //     this.dataCollection.getMembershipByID(params.id).subscribe(data => {
    //       this.pageContent = data;
    //     })
    //   }
    // });

    if(this.activatedRoute.snapshot.paramMap.get('id')){
      this.dataCollection.getExclusiveAccessById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
        this.pageContent = data;
        //console.log(this.pageContent)
      })
    }
   

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
  
  };

  bookNow(formName){
    //console.log(formName)
    var form = formName;
    this.router.navigateByUrl(`tabs/booking/${formName}`);
  };
   
  goToRSVPLink(pageContent){
    //console.log(pageContent)
    // this.openLink(link)

    if(this.angularFireAuth.auth.currentUser != null){
      this.isLogin = true;
      //console.log(GlobalService.userDetails)
      if(GlobalService.userDetails.status == "inactive"){
        if(pageContent.rsvpNonMember){
          this.openLink(pageContent.rsvpNonMember)
        }
        else{
           this.presentToast('Your account is not active.');
        }
       
      }
      else if(GlobalService.userDetails.access_type == "limited"){
        if(pageContent.rsvpNonMember){
          this.openLink(pageContent.rsvpNonMember)
        }
        else{
          this.presentToast('Kindly note that this feature is only available for Privilege, Premium, Elite and Infinity Members.');
        }
        
      }
      else{

      
        if(pageContent['externalLink']){
          this.openLink(pageContent.rsvp)
        }
        else{
          this.router.navigateByUrl(`${pageContent.rsvp}`);
        }
      }
  }
  else{
    if(pageContent.rsvpNonMember){
      this.openLink(pageContent.rsvpNonMember)
    }
  }
}

  

  openLink(link){

    const browser = this.iab.create(link, '_blank');
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
