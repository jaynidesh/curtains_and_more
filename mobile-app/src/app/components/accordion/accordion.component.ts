import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  @Input()
  name : any;

  @Input()
  description : any;
  
  isListItemOpened : boolean = false;

  constructor() { }

  ngOnInit() {}

  toggleAccordion(): void {
    this.isListItemOpened = !this.isListItemOpened;
  }

  toJson(elem){
    console.log(elem)
    return JSON.parse(elem)
  }

}