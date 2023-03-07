import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild("header", {static: false}) header: HTMLElement;

  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  menus;
  content
  constructor(
    public element: ElementRef,
    public dataCollection : FirebaseDataCollectionService,
    public renderer: Renderer2,
    private calendar: Calendar,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {

    this.dataCollection.getEvents().subscribe(data => {
      this.content = data;
      //console.log(data)
    })
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
      ////console.log(`${eventDate}-${eventMonth}-${eventYear}`)
      return `${eventDate}-${eventMonth}-${eventYear}`;
    };


    addEventToCalendar(event) {
      //console.log(event)
      console.log(event)
      let date = this.convertToDate(event.value.start_date);
      let startDateTime= this.convertToDate(event.value.start_date);
      let newStartDateTimeFormat= startDateTime.split("-");
      var newStartDateTime=newStartDateTimeFormat[1]+"/"+newStartDateTimeFormat[0]+"/"+newStartDateTimeFormat[2];
  
      let endDateTime=this.convertToDate(event.value.end_date);;
      let newEndDateTimeFormat= endDateTime.split("-");
      var newEndDateTime=newEndDateTimeFormat[1]+"/"+newEndDateTimeFormat[0]+"/"+newEndDateTimeFormat[2];
      
      let location = event.value.location ? event.value.location : '';
      let notes = event.value.notes ? event.value.notes : '';

      //console.log(newStartDateTime)
      //console.log(newEndDateTime)
      //console.log(new Date(newStartDateTime))
      //console.log(new Date(newEndDateTime))
      console.log(event.value.name, location, notes, new Date(newStartDateTime), new Date(newEndDateTime))
      this.calendar.createCalendar('Le Club').then(
        (msg) => { 
          
          this.calendar.createEventInteractively(event.value.name, location, notes, new Date(newStartDateTime), new Date(newEndDateTime))
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
