import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { DocModeOpts, ConversationItem, CommConversationSub, CommData } from '../../../@cd/sys/comm/models/comm.model';

@Component({
  selector: 'ngx-read-doc',
  templateUrl: './read-doc.component.html',
  styleUrls: ['./read-doc.component.scss']
})
export class ReadDocComponent implements OnInit, AfterViewInit {
  @ViewChild('divMessage') divMessage: ElementRef;
  selectedConversation: ConversationItem;
  constructor(
    public svConversation: CommconversationService,
  ) { }

  ngOnInit(): void {
    console.log("this.svConversation.conversation:", this.svConversation.conversation);
    this.selectedConversation = this.svConversation.demoSelectedConversation()[0];
    console.log('this.selectedConversation:', this.selectedConversation);
    // flag memo as 'seen'
    const docID = this.selectedConversation.doc_id;
    this.svConversation.flagOpenMemoObsv(docID)
      .subscribe((ret) => {
        console.log(ret);
      });

  }

  ngAfterViewInit() {
    this.loadHtml();
  }

  loadHtml() {
    this.divMessage.nativeElement.innerHTML = this.selectedConversation.memo_message;
  }

}
