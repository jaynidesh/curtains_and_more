import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseDataCollectionService } from '../../../services/firebase-data-collection.service';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-view-privilege',
  templateUrl: './view-privilege.page.html',
  styleUrls: ['./view-privilege.page.scss'],
})
export class ViewPrivilegePage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;

@ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  pageContent;
  isLogin;
  constructor(
    public dataCollection : FirebaseDataCollectionService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public element: ElementRef,
    public toastController : ToastController,
    public renderer: Renderer2,
    private angularFireAuth : AngularFireAuth,
    private iab: InAppBrowser
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
      this.dataCollection.getPrivilegeById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
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

  bookNow(pagecontent, selection){

    if(this.angularFireAuth.auth.currentUser != null){
      var form = pagecontent;
      this.isLogin = true;
      if(GlobalService.userDetails.status == "inactive"){
        this.presentToast('Your account is not active.');
      }
      else if(GlobalService.userDetails.access_type == "limited"){
        this.presentToast('Kindly note that this feature is only available for Privilege, Premium, Elite and Infinity Members.');
      }
      else{
        let navigationExtras: NavigationExtras = {
          queryParams: {
            selection:selection
          } 
        };
        

        if(pagecontent['formExternal']){
          this.openLink(pagecontent.form)
        }
        else{
          // this.router.navigateByUrl(`${pagecontent.form}`, {'selection':selection});
          this.router.navigate([`${pagecontent.form}`], navigationExtras);
        }
      }

      
      
    }
    else{
        this.isLogin = false;
        this.presentToastNotLogin();
      }
    //console.log(pagecontent)
    
  };

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
