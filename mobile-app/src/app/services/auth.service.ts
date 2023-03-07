import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { Router } from '@angular/router';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : BehaviorSubject<User> = new BehaviorSubject(null);
  private user: firebase.User;
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    private fireDataBase: AngularFireDatabase,
    private router : Router,
    public toastController : ToastController,
    public loadingController : LoadingController
  ) { 

    this.angularFireAuth.authState.subscribe(user => {
      if(user){
        //console.log('user sign in')

      }
      else{
        //console.log('user not sign in')
      }
    });
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.angularFireAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  // loginUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.angularFireAuth.auth.signInWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => resolve(res),
  //         err => reject(err))
  //   })
  // }

  loginUser(value) {
    this.presentLoading();
    this.angularFireAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          user =>{
            // this.updateUser(user);
            console.log(user)
            this.router.navigateByUrl('/tabs/home');
            this.loadingController.dismiss();
          }
        )
        .catch(
          error => {
            this.presentToast(error.message)
            this.loadingController.dismiss();
          }
        )

  };

  loginUser2(value) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          user =>{
            this.updateUser(user);
            this.router.navigateByUrl('/schedule');
          }
        )
        .catch(
          error => {
            this.presentToast(error.message)
          }
        )

  };

  

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.auth.currentUser) {
        this.angularFireAuth.auth.signOut()
          .then(() => {
            //console.log("LOG Out");

          }).catch((error) => {
            reject();
          });
      }
    })
  };

  get authenticated(): boolean {
    return this.user !== null;
  }

  get userUid(){
    let userUid;
    this.angularFireAuth.user.subscribe(user => {
      userUid = user
    });
    return userUid;

  };

  checkLoginStatus() {
    firebase.auth().onAuthStateChanged((user) =>{ 
      if(user) { 
        
        return user
      }
    });




  };

  getUserDetails(user){

    const ref = this.fireDataBase.object(`/le-club-users/${user}/`);
    return ref.valueChanges()
  };

  userDetails() {
    return this.angularFireAuth.user
  }

  private updateUser (authData){

    const userData = new User(authData.user);
    const ref = this.fireDataBase.object(`/users/${authData.user.uid}/`);
    ref.valueChanges().subscribe(user =>{

      if(!user){
        ref.update(userData)
      }
    })
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  };

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
}