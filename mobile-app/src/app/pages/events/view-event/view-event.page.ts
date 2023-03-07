import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { FirebaseDataCollectionService } from '../../../services/firebase-data-collection.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {

  @ViewChild("header", {static: false}) header: HTMLElement;

  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  menus;
  pageContent;
  constructor(
    public element: ElementRef,
    public dataCollection : FirebaseDataCollectionService,
    public renderer: Renderer2,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private calendar: Calendar,
    private iab: InAppBrowser

  ) { }

  ngOnInit() {

    if(this.activatedRoute.snapshot.paramMap.get('event-id')){
      this.dataCollection.getEventsByID(this.activatedRoute.snapshot.paramMap.get('event-id')).subscribe(data => {
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
    
    }

    convertToDate(datetime){
      const date = new Date(datetime);

      let eventYear = date.getFullYear();

      let eventMonth : any = date.getMonth() + 1;

      if (eventMonth < 10){
        eventMonth = '0' + eventMonth
      };

      let eventDate : any = date.getDate();

      if (eventDate < 10){
        eventDate = '0' + eventDate
      };
      return `${eventDate}-${eventMonth}-${eventYear}`;
    }

    _addEventToCalendar() {
      console.log(this.pageContent)

      let date = this.convertToDate(this.pageContent.date);
      let startDateTime= this.convertToDate(this.pageContent.start_date);
      let newStartDateTimeFormat= startDateTime.split("-");
      var newStartDateTime=newStartDateTimeFormat[1]+"/"+newStartDateTimeFormat[0]+"/"+newStartDateTimeFormat[2];
  
      let endDateTime=this.convertToDate(this.pageContent.end_date);
      let newEndDateTimeFormat= endDateTime.split("-");
      var newEndDateTime=newEndDateTimeFormat[1]+"/"+newEndDateTimeFormat[0]+"/"+newEndDateTimeFormat[2];

      let location = this.pageContent.location ? this.pageContent.location : '';
      let notes = this.pageContent.notes ? this.pageContent.notes : '';

      //console.log(this.pageContent.start_date)
      //console.log(this.pageContent.end_date)

      this.calendar.createCalendar('Le Club').then(
        (msg) => { 
          
          this.calendar.createEventInteractively(this.pageContent.name, location, notes, this.pageContent.start_date, this.pageContent.end_date)
        },
        (err) => { console.log(err); }
      );
    }
    addEventToCalendar(event) {
      //console.log(event)
      console.log(event)
      let date = this.convertToDate(this.pageContent.start_date);
      let startDateTime= this.convertToDate(this.pageContent.start_date);
      let newStartDateTimeFormat= startDateTime.split("-");
      var newStartDateTime=newStartDateTimeFormat[1]+"/"+newStartDateTimeFormat[0]+"/"+newStartDateTimeFormat[2];
  
      let endDateTime=this.convertToDate(this.pageContent.end_date);;
      let newEndDateTimeFormat= endDateTime.split("-");
      var newEndDateTime=newEndDateTimeFormat[1]+"/"+newEndDateTimeFormat[0]+"/"+newEndDateTimeFormat[2];
      
      let location = this.pageContent.location ? this.pageContent.location : '';
      let notes = this.pageContent.notes ? this.pageContent.notes : '';

      //console.log(newStartDateTime)
      //console.log(newEndDateTime)
      //console.log(new Date(newStartDateTime))
      //console.log(new Date(newEndDateTime))
      console.log(this.pageContent.name, location, notes, new Date(newStartDateTime), new Date(newEndDateTime))
      this.calendar.createCalendar('Le Club').then(
        (msg) => { 
          
          this.calendar.createEventInteractively(this.pageContent.name, location, notes, new Date(newStartDateTime), new Date(newEndDateTime))
        },
        (err) => { console.log(err); }
      );
    }

    goToRSVPLink(link){
      this.openLink(link)
    }

    openLink(link){

      const browser = this.iab.create(link, '_blank');
    };

}
