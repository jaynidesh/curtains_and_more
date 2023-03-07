import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { AlertController, MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FirebaseDataCollectionService } from './services/firebase-data-collection.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase';
import { GlobalService } from './services/global.service';
// import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'ACCUEIL',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'AGENDA',
      url: '/schedule',
      icon: 'calendar'
    },
    {
      title: 'ORATEURS',
      url: '/speakers',
      icon: 'people'
    },
    {
      title: 'VOS QUESTIONS',
      url: '/user-questions',
      icon: 'help-circle'
    },
    {
      title: 'INFOS PRATIQUES',
      url: '/about',
      icon: 'help-circle'
    }
  ];
  loggedIn = false;
  dark = false;
  links;

  userIsAdmin = false;
  userIsSuperAdmin = false;
  userIsPriviledge = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private firebaseDataCollectionService : FirebaseDataCollectionService,
    private iab: InAppBrowser,
    private authService : AuthService,
    public toastController : ToastController,
    // private nativeHTTP : HTTP
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString('#000000');
      this.statusBar.overlaysWebView(false); 
      this.splashScreen.hide();

      // if (this.platform.is('cordova')) {
        // this.setupPush();
      // }


      this.oneSignal.startInit('9a782c96-dbdb-4e45-a006-00138cf4fbbc', '600713255665');

        // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert); //displayAlert in app
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          // alert('notificationOpenedCallback: ' + JSON.stringify(data));
          // alert(data.notification.payload.additionalData.page);

          if(data.notification.payload.additionalData.page){
            this.router.navigateByUrl(data.notification.payload.additionalData.page)
          }

        });

        this.oneSignal.getIds().then(res => {
          // alert(res)
          // alert(res.userId)
          // alert(res.pushToken)
        });

        this.oneSignal.endInit();

      // this.firebaseDataCollectionService.getLinks().subscribe(data => {
      //   this.links = data;
      // });
    });

    // this.nativeHTTP.setServerTrustMode('nocheck')
    // .then(
    //     (res) => {
    //       console.log(res)
    //     }
    // )
    // .catch(
    //     (error) => {
    //       console.log(error)
    //     }
    // );
    
  };

  // setupPush() {
  //   // I recommend to put these into your environment.ts
  //   this.oneSignal.startInit('70a7bc72-7c10-4792-9b7a-651aee531246', '491083968207');
 
  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
  //   // Notifcation was received in general
  //   this.oneSignal.handleNotificationReceived().subscribe(data => {
  //     let msg = data.payload.body;
  //     let title = data.payload.title;
  //     let additionalData = data.payload.additionalData;
  //     this.showAlert(title, msg, additionalData.task);
  //   });
 
  //   // Notification was really clicked/opened
  //   this.oneSignal.handleNotificationOpened().subscribe(data => {
  //     // Just a note that the data is a different place here!
  //     let additionalData = data.notification.payload.additionalData;
 
  //     // this.showAlert('Notification opened', 'You already read this before', additionalData.task);
  //   });
 
  //   this.oneSignal.endInit();
  // }
 
  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  };

  openLink(link){

    const browser = this.iab.create(link, '_blank');
  }
  

  checkLoginStatus() {
    firebase.auth().onAuthStateChanged((user) =>{ 
      if(user) { 
        let userEmail = user.email; 
        let uid = user.uid;
        // GlobalService.userID = uid;
        this.loggedIn = true;

        this.authService.getUserDetails(uid).subscribe(user =>{
          // console.log(user);
          GlobalService.userID = uid;
          if(user !=null){
            GlobalService.userDetails = user;
            if(user['user_type'] && user['user_type'] == 'priviledge'){
              this.userIsPriviledge = true;
            }
  
            if(user['user_type'] && user['user_type'] == 'admin'){
              this.userIsAdmin = true;
            }
  
            if(user['roles'] && user['roles']['superAdmin'] == true){
              this.userIsSuperAdmin = true;
            }
          }
          else{
            this.logout()
          }
          
          
        });

      }
      else { this.loggedIn =false
        this.loggedIn = false;
        this.userIsAdmin = false;
        this.userIsSuperAdmin = false;

        this.router.navigateByUrl('/before-login');
      } });
    // this.authService.userDetails().subscribe(res => {
    //console.log('res', res);
    //   if (res !== null) {
    //     let userEmail = res.email; 
    //     let uid = res.email;
    //     this.loggedIn = true;
    //     this.getUserDetails(res.uid);
    //   } else {
    //     this.loggedIn = false;
    //     this.router.navigateByUrl('/login');
    //   }
    // }, err => {
    //console.log('err', err); 
    // });



  };

  getUsewrDetails(uid){
    this.authService.getUserDetails(uid).subscribe(user =>{


      console.log(user)
      if(user['roles'] && user['roles']['admin'] == true){
        this.userIsAdmin = true;
      }

      else if(user['roles'] && user['roles']['superAdmin'] == true){
        this.userIsSuperAdmin = true;
      }
      else{
        this.userIsAdmin = false;
        this.userIsSuperAdmin = false;
      }
    });
  }



  logoutUser(){
    this.authService.logoutUser();
  };

  get userAuthenticated(){
    return this.authService.authenticated;
  };

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  };

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/home');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position : "top"
    });
    toast.present();
  };
}
