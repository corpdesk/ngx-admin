import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';

@Component({
  selector: 'ngx-read-doc',
  templateUrl: './read-doc.component.html',
  styleUrls: ['./read-doc.component.scss']
})
export class ReadDocComponent implements OnInit, AfterViewInit {
  @ViewChild('divMessage') divMessage: ElementRef;
  selectedConversation;
  constructor(
    public svConversation: CommconversationService,
  ) { }

  ngOnInit(): void {
    // console.log('ReadDocComponent::ngOnInit()/this.svConversation.clickedCommConversationID:', this.svConversation.clickedCommConversationID);
    // // getConversationObsv(commconversationID)
    // this.svConversation.clickedCommConversationID = 99;
    // console.log('ReadDocComponent::ngOnInit()/this.svConversation.clickedCommConversationID:', this.svConversation.clickedCommConversationID);
    console.log("this.svConversation.conversation:", this.svConversation.conversation);
    this.selectedConversation = this.svConversation.demoSelectedConversation()[0];
    console.log('this.selectedConversation:', this.selectedConversation);
    
  }

  ngAfterViewInit(){
    this.loadHtml();
  }

  loadHtml() {
    this.divMessage.nativeElement.innerHTML = this.selectedConversation.memo_message;
  }

}
