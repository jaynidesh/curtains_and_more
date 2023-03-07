import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FirebaseDataCollectionService } from '../../services/firebase-data-collection.service';

@Component({
  selector: 'app-our-collaborators',
  templateUrl: './our-collaborators.page.html',
  styleUrls: ['./our-collaborators.page.scss'],
})
export class OurCollaboratorsPage implements OnInit {

  @ViewChild("header", {static: false}) header: HTMLElement;

  @ViewChild("toolbar", {static: false}) toolbar: HTMLElement;
  allCollaborators;

  isListItemOpened : boolean = false;
  constructor(
    private firebaseDataCollectionService: FirebaseDataCollectionService,
    public element: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    // set get menu here
    this.firebaseDataCollectionService.getAllMenu('privileges-contents').subscribe(data => {
      this.allCollaborators = data;
    });
  };

  toggleAccordion(): void {
    this.isListItemOpened = !this.isListItemOpened;
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

    toString(elem){

      return JSON.stringify(elem)
    }

}

