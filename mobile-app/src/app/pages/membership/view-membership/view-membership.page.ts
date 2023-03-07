import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataCollectionService } from '../../../services/firebase-data-collection.service';

@Component({
  selector: 'app-view-membership',
  templateUrl: './view-membership.page.html',
  styleUrls: ['./view-membership.page.scss'],
})
export class ViewMembershipPage implements OnInit {
  @ViewChild("header", {static: false}) header: HTMLElement;

@ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  pageContent;
  constructor(
    public dataCollection : FirebaseDataCollectionService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public element: ElementRef,

    public renderer: Renderer2
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
      this.dataCollection.getMembershipByID(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
        this.pageContent = data;
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


}
