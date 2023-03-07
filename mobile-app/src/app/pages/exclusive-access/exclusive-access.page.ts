
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-exclusive-access',
  templateUrl: './exclusive-access.page.html',
  styleUrls: ['./exclusive-access.page.scss'],
})
export class ExclusiveAccessPage implements OnInit {

  @ViewChild("header", {static: false}) header: HTMLElement;

@ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
exclusiveAccess;
  constructor(
    public dataCollection : FirebaseDataCollectionService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public element: ElementRef,
    private storage: Storage,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.storage.get('membership').then(res => {
      this.exclusiveAccess =res;
    });
    this.dataCollection.getExclusiveAccess().subscribe(data => {
      this.exclusiveAccess = data;
      this.storage.set('membership', data)
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
  
  };

  bookNow(formName){
    //console.log(formName)
    var form = formName;
    this.router.navigateByUrl(`tabs/booking/${formName}`);
  };


}
