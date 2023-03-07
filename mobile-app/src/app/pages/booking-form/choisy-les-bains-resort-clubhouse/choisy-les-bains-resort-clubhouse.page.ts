import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FirebaseDataCollectionService } from '../../../services/firebase-data-collection.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../../../services/global.service';
import { take, map, switchMap, finalize } from 'rxjs/operators';
import { Observable, forkJoin, from } from 'rxjs';  
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// import { HTTP } from '@ionic-native/http/ngx';

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(environment.SENDGRID_API_KEY);
@Component({
  selector: 'app-choisy-les-bains-resort-clubhouse',
  templateUrl: './choisy-les-bains-resort-clubhouse.page.html',
  styleUrls: ['./choisy-les-bains-resort-clubhouse.page.scss'],
})
export class ChoisyLesBainsResortClubhousePage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;  
  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  hotelReservation: FormGroup;
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
    this.firebaseDataCollectionService.getAllMenu('privileges-contents').subscribe(data => {
      this.allCollaborators = data;
      //console.log(data)

      this.allCollaborators.forEach( (element) => {
        //console.log(element)
        if(element.name == 'Sea, Land, Air Activities'){
          this.selectedCollaborators = element.collaborators;
        }
      });

      //console.log(this.selectedCollaborators)

    });

    this.userDetails = GlobalService.userDetails;

    //console.log(this.userDetails)
    //console.log(GlobalService.userID)

  
    this.hotelReservation = new FormGroup({
      created_date: new FormControl(this.today, [Validators.required]),
      card_number: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      access_type: new FormControl("", [Validators.required]),
      user_id: new FormControl(GlobalService.userID, [Validators.required]),
      reservation_status: new FormControl('pending', [Validators.required]),
      form_data: new FormGroup({
        item_A: new FormGroup({
          question:  new FormControl("On which date do you which to access Choisy Les Bains Resort Clubhouse ?", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
          rawValue:  new FormControl("", [Validators.required]),
        }),
        item_B: new FormGroup({
          question:  new FormControl("Which exclusive access best fit your needs?", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_C: new FormGroup({
          question:  new FormControl("Names of accompanied guests", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_D: new FormGroup({
          question:  new FormControl("Do you or your guests have any dietary restrictions and/or allergies?", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_E: new FormGroup({
          question:  new FormControl("Any additional queries that you might have", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
      }),
      // hotel_name:  new FormControl("", [Validators.required]),
      // package_type:  new FormControl("", [Validators.required]),
      // check_in_date:  new FormControl("", [Validators.required]),
      // check_out_date:  new FormControl("", [Validators.required]),
      // number_of_person:  new FormControl("", [Validators.required]),
      // number_of_rooms:  new FormControl("", [Validators.required]),
      // number_of_children:  new FormControl("", [Validators.required]),
      // room_preferences:  new FormControl("", [Validators.required]),
      // meal_plan:  new FormControl("", [Validators.required]),
      // special_occasion:  new FormControl("", [Validators.required]),
      // dietary_restriction:  new FormControl("", [Validators.required]),
      // hotel_facilities_looking_for:  new FormControl("", [Validators.required]),
      // reservation_in_name:  new FormControl("", [Validators.required]),
   });

   this.hotelReservation.patchValue(this.userDetails);
   this.route.queryParams.subscribe(params => {
    if(params.selection){
      this.selection = params.selection;
      this.hotelReservation.get(['form_data', 'item_A', 'value']).patchValue(this.selection)
    }
    

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
      return this.hotelReservation.controls;
    }

    get getForm() {
      return this.hotelReservation;
    }

    errorControlDynamicForValue(grandParent, parent,type) {
      return this.hotelReservation.controls[grandParent]['controls'][parent]['controls']['value']['type'];
    }

    submitForm(){
      this.submitted = true;
          // this.router.navigateByUrl(`tabs/concierge-reservation`);
      //console.log(this.hotelReservation.getRawValue());
      //console.log(this.hotelReservation);

      if (!this.hotelReservation.valid) {
        //console.log('Please provide all the required values!')
        return false;
      } else {
        let formdata = this.hotelReservation.getRawValue();
        this.firebaseDataCollectionService.saveConciergeReservation('choisy_les_bains', JSON.stringify(formdata)).then( () =>{
          //console.log('request saved')

          this.presentToast('Your request has been saved.');
          this.hotelReservation.controls['form_data'].reset();
          this.submitted = false;
          this.router.navigateByUrl(`tabs/concierge-reservation`);
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

    returnOnlyDate(e, control){
      //console.log(e);
      let val = new Date(e.detail.value);
      var dd = String(val.getDate()).padStart(2, '0');
      var mm = String(val.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = val.getFullYear();

      this.hotelReservation.get(['form_data', `${control}`, 'value']).patchValue(`${dd}-${mm}-${yyyy}`)
    }

    returnOnlyTime(e, control){
      let val = new Date(e.detail.value);

      var hour = String(val.getHours());
      var minutes = String(val.getMinutes());

      this.hotelReservation.get(['form_data', control, 'value']).patchValue(`${hour}:${minutes}`)
    }


    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }

}