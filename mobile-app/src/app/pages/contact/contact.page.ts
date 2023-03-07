import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';
import { take, map, switchMap, finalize } from 'rxjs/operators';
import { Observable, forkJoin, from } from 'rxjs';  
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// import { HTTP } from '@ionic-native/http/ngx';

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(environment.SENDGRID_API_KEY);
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;  
  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  contactForm: FormGroup;
  submitted;
  allCollaborators;
  selectedCollaborators;
  userDetails;
  selection;
  today = new Date();
  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    public formBuilder: FormBuilder,
    private firebaseDataCollectionService: FirebaseDataCollectionService,
    private httpClient: HttpClient,
    public toastController : ToastController,
    public router : Router,
    private route: ActivatedRoute
    // private nativeHttp : HTTP,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      //console.log(params)
  });

    this.userDetails = GlobalService.userDetails;

    //console.log(this.userDetails)
    //console.log(GlobalService.userID)

  
    this.contactForm = new FormGroup({
      created_date: new FormControl(this.today, [Validators.required]),
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.minLength(7)]),
      message: new FormControl("", [Validators.required]),
      contact_status : new FormControl("pending", [Validators.required]),
      date_submission : new FormControl(new Date())
   });

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


    get errorControl() {
      return this.contactForm.controls;
    }

    get getForm() {
      return this.contactForm;
    }

    submitForm(){
      this.submitted = true;
          // this.router.navigateByUrl(`tabs/concierge-reservation`);
      //console.log(this.contactForm.getRawValue());
      //console.log(this.contactForm);

      if (!this.contactForm.valid) {
        //console.log('Please provide all the required values!')
        return false;
      } else {
        let formdata = this.contactForm.getRawValue();
        this.firebaseDataCollectionService.saveContactForm('contactForm', JSON.stringify(formdata)).then( () =>{
          //console.log('request saved')

          this.presentToast('Your request has been saved.');
          this.submitted = false;
          // this.hotelReservation.controls['form_data'].reset();
          this.contactForm.reset();
          // this.router.navigateByUrl(`tabs/concierge-reservation`);
        }
          
        ).catch(

        )
      }
      
    }

    get todayDate(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();


      return `${yyyy}-${mm}-${dd}`
    }




    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }

    

}
