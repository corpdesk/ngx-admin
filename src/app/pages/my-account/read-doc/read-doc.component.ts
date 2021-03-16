import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { DocModeOpts, ConversationItem, CommConversationSub, CommData } from '../../../@cd/sys/comm/models/comm.model';
import { SocketIoService } from '../../../@cd/sys/cd-push/controllers/socket-io.service'

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
    private svSocket: SocketIoService,
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

  // set all the events that compose-doc should listen to
  pushSubscribe() {
    this.svSocket.listen('response').subscribe(data => {
      console.log('Response received');
      console.log(data);
    });

    this.svSocket.listen('broadcast-message').subscribe(data => {
      console.log('Response received');
      console.log(data);
      // this.receiveMessage(data);
    });

    this.svSocket.listen('session_confirm').subscribe(data => {
      console.log('Session is CONFIRMED');
      this.svSocket.emit('message', {
        sender_id: 'shivampip',
        session_id: 'shivampip',
        message: 'bye'
      });
    });
    this.svSocket.listen('connect').subscribe(data => {
      console.log('I am Connected to Socket server');
      this.svSocket.emit('session_request', { session_id: 'shivampip' });
    });
  }

  setAttachmentAddr(pix) {
    let ret;
    switch (pix) {
      case 1:
        return `${environment.HOST}/attachments/e60dd9d4-e96c-48c2-b8a7-0745d4b5a67c/p1.jpg`;
        break;
      case 2:
        return `${environment.HOST}/attachments/e60dd9d4-e96c-48c2-b8a7-0745d4b5a67c/p2.jpg`;
        break;
    }
    // return ret;
  }

  loadHtml() {
    this.divMessage.nativeElement.innerHTML = this.selectedConversation.memo_message;
  }

}
