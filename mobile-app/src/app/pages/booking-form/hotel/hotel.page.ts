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
  selector: 'app-hotel',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
})
export class HotelPage implements OnInit {
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
    //console.log(this.router)
    
    this.firebaseDataCollectionService.getAllMenu('privileges-contents').subscribe(data => {
      this.allCollaborators = data;

      this.allCollaborators.forEach( (element) => {
        if(element.name == 'Hotels'){
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
          question:  new FormControl("Which hotel do you wish to visit ?", [Validators.required]),
          value:  new FormControl('', [Validators.required]),
        }),
        item_B: new FormGroup({
          question:  new FormControl("Package Type", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_C: new FormGroup({
          question:  new FormControl("Check in date", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
          rawValue:  new FormControl("", [Validators.required]),
        }),
        item_D: new FormGroup({
          question:  new FormControl("Check out date", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
          rawValue:  new FormControl("", [Validators.required]),
        }),
        item_E: new FormGroup({
          question:  new FormControl("Number of Persons", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_F: new FormGroup({
          question:  new FormControl("Number of Rooms", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_G: new FormGroup({
          question:  new FormControl("Number of children", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_H: new FormGroup({
          question:  new FormControl("Please specify any room preferences", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_I: new FormGroup({
          question:  new FormControl("Meal Plan", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_J: new FormGroup({
          question:  new FormControl("Does this hotel visit mark a special occasion?", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_K: new FormGroup({
          question:  new FormControl("Please indicate any dietary restrictions", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_L: new FormGroup({
          question:  new FormControl("What are the Hotel Facilities that you are looking forward to?", [Validators.required]),
          value:  new FormControl("", [Validators.required]),
        }),
        item_M: new FormGroup({
          question:  new FormControl("The reservation will be in the name of:", [Validators.required]),
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

      return this.hotelReservation.controls[grandParent]['controls'][parent]['controls']['value'][type];
    }

    __submitForm() {
      //console.log(this.hotelReservation.value)
      this.submitted = true;
      let headers = new Headers();

          headers.append('Content-Type', 'application/json');
          headers.append("Access-Control-Allow-Origin", "*")
          headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
          headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

      let headersOption : {
        headers
      }

      const msg = {
        to: 'jay.nidesh@gmail.com', // Change to your recipient
        from: 'jay.nidesh@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        content: `<strong>and easy to do anywhere, even with Node.js</strong><br/>${this.hotelReservation.value}`,
      }

      try {
        const url = 'https://app.leclub.mu/mail.php';
        const params = {};
        const headers = {};
  
        const response = this.httpClient.post(url, msg, headers);
  
        //console.log(response);
      } catch (error) {
        console.error(error.status);
        console.error(error.error); // Error message as string
        console.error(error.headers);
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      this.httpClient.post('https://cors-anywhere.herokuapp.com/https://app.leclub.mu/send-mail/mail.php', msg, httpOptions)
      .pipe(
        // catchError(this.handleError('addHero', hero))
        
      ).subscribe(response => {
        //console.log('response')
        //console.log(response)
        //console.log('response')
      });


    // this.httpClient.post('https://app.leclub.mu/send-mail/mail.php', msg).subscribe(data => {
    //   //console.log(data);
    // })
      //console.log(this.errorControl)
      if (!this.hotelReservation.valid) {
        //console.log('Please provide all the required values!')
        return false;
      } else {
        //console.log(this.hotelReservation.value)
      }
    }

    submitForm(){
      this.submitted = true;
          // this.router.navigateByUrl(`tabs/concierge-reservation`);
      //console.log(this.hotelReservation.getRawValue());
      if (!this.hotelReservation.valid) {
        //console.log('Please provide all the required values!')
        return false;
      } else {
        let formdata = this.hotelReservation.getRawValue();
        this.firebaseDataCollectionService.saveConciergeReservation('hotels', JSON.stringify(formdata)).then( () =>{
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

    // postForm(api_data){
    //   this.nativeHttp.setDataSerializer('multipart')
    //   let promise = new Promise((resolve, reject) => {
    //     let getData = this.nativeHttp.post(`https://app.leclub.mu/mail.php`, api_data, {});
    //     from(getData).pipe(map(response => {
    //       return response;
    //     }))
    //     .subscribe(
    //       response => {
    //           let result = response;
    //           //console.log(result)
    //           resolve(result);
    //         },
    //         error => {
    //           //console.log(error)
    //           // alert('error')
    //           reject(error);
    //         }
    //       );
    //   });
      
    //   return promise;
    // };

    submitForm1(data){
      this.httpClient.post('https://app.leclub.mu/send_mail_api/send.php', data).pipe().subscribe(
        data => {
          //console.log(data)
        },
        err =>{
          //console.log('error' + err)
          //console.log(err)
        }
      )
    };

    get todayDate(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();


      return `${yyyy}-${mm}-${dd}`
    }

    returnOnlyDate1(e, control){
      //console.log(e);
      let val = new Date(e.detail.value);
      var dd = String(val.getDate()).padStart(2, '0');
      var mm = String(val.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = val.getFullYear();

      this.hotelReservation.get(['form_data', `${control}`, 'value']).patchValue(`${dd}-${mm}-${yyyy}`)
    }

    returnOnlyDate2(e, control){
      //console.log(e);
      let val = new Date(e.detail.value);
      var dd = String(val.getDate()).padStart(2, '0');
      var mm = String(val.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = val.getFullYear();

      this.hotelReservation.get(['form_data', `${control}`, 'value']).patchValue(`${dd}-${mm}-${yyyy}`)
    }
    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }

    // submitForm(){
    //   const msg = {
    //     to: 'jay.nidesh@gmail.com', // Change to your recipient
    //     from: 'jay.nidesh@gmail.com', // Change to your verified sender
    //     subject: 'Sending with SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     content: `<strong>and easy to do anywhere, even with Node.js</strong><br/>${this.hotelReservation.value}`,
    //   }
    //   let nativeCall = this.nativeHttp.put('https://app.leclub.mu/send_mail_api/send.php', this.hotelReservation.value, {
    //     'Content-Type':  'application/json',
    //   });

    //   from(nativeCall).pipe().subscribe(
    //     data => {
    //       //console.log(data)
    //     },
    //     err =>{
    //       //console.log('error' + err)
    //       //console.log(err)
    //     }
    //   )
    // }
}
