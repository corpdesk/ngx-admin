import { Component, OnInit } from '@angular/core';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { DocModeOpts, ConversationItem } from '../../../@cd/sys/comm/models/comm.model';
import { MessagesService } from '../../../@cd/sys/comm/controllers/messages.service';

@Component({
  selector: 'ngx-intray',
  templateUrl: './intray.component.html',
  styleUrls: ['./intray.component.scss']
})
export class IntrayComponent implements OnInit {
  messages;
  
  
  constructor(
    public svConversation: CommconversationService,
    public svMesseges: MessagesService,
  ) { }

  ngOnInit(): void {
    // this.svConversation.ConversationInboxObsv()
    //   .subscribe((ret: any) => {
    //     console.log('ret:', ret);
    //     this.svConversation.conversation = ret.data.conversation;
    //     this.messages = this.svConversation.conversation;
    //     this.svConversation.InBoxData = this.svConversation.conversation;
    //     this.svConversation.countInBox = this.messages.length;
    //     this.updateUnread();
    //     // console.log('unreadMessages:', unreadMessages);
    //     console.log('this.messages:', this.messages);
    //     console.log('this.svConversation.conversation:', this.svConversation.conversation);
    //   }); 
    this.svConversation.init();
  }

  rowSelect(ctx) {
    console.log('starting rowSelect(ctx)');
    console.log('ctx:', ctx);
    // ctx.conversation_id = 99;
    this.svConversation.clickedCommConversationID = ctx.commconversation_id;
    console.log('IntrayComponent::rowSelect()/this.svConversation.clickedCommConversationID:', this.svConversation.clickedCommConversationID);
    const options: DocModeOpts = { commconversation_id: ctx.commconversation_id };
    this.svConversation.setMode('READ-DOC', options);
    this.svConversation.updateUnread();
  }

  

  docAttended(attended){
    if(attended){
      return 'read';
    } else {
      return 'unread';
    }
  }

  hasAttachment(item: ConversationItem){
    if(item.attachment){
      return true;
    } else {
      return false;
    }
  }

}
