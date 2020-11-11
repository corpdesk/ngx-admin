import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { from } from 'rxjs';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';
import { DocModeOpts, ConversationItem, ConversationMeta, CommConversationSub, CommData } from '../models/comm.model';


@Injectable({
  providedIn: 'root'
})
export class CommconversationService {
  UserData;
  postData;
  OutBoxData = [];
  InBoxData = [];
  unreadMessages = [];
  countInBox = 0;
  countOutBox = 0;
  countUnread = 0;
  elInBox;
  elOutBox;
  subscribers: CommConversationSub[]; // conversation subscribers
  conversation: ConversationItem[] = [];
  selectedMessage: any;
  IntrayMeta: ConversationMeta = {
    pageHeader: null,
    showThread: null,
    labels: null,
    showLabels: null,
    flags: null,
    showFlags: null,
  };

  docModeInTray = true;
  docModeOutTray = false;
  docModeComposeDoc = false;
  docModeReadDoc = false;
  docModeReplyDoc = false;
  clickedCommConversationID = -1;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    public svUser: UserService,
  ) {
    this.IntrayMeta.pageHeader = "View Message";

  }

  init() {
    this.inBox();
    this.outBox();
    this.elInBox = document.getElementById('memo-menu-inbox');
    this.elOutBox = document.getElementById('memo-menu-outbox');
    this.selectInbox();
  }

  selectInbox(){
    this.elInBox.classList.add('memo-menu-selected');
    this.elOutBox.classList.remove('memo-menu-selected');
  }

  selectOutbox(){
    this.elInBox.classList.remove('memo-menu-selected');
    this.elOutBox.classList.add('memo-menu-selected');
  }

  updateUnread() {
    this.unreadMessages = this.InBoxData.filter((m) => {
      if (m.attended == 0) {
        return m;
      }
    });
    this.countUnread = this.unreadMessages.length;
  }

  setMode(docMode, options: DocModeOpts) {
    console.log('this.conversation:', this.conversation);
    this.elInBox = document.getElementById('memo-menu-inbox');
    this.elOutBox = document.getElementById('memo-menu-outbox');
    switch (docMode) {
      case 'IN-TRAY':
        this.inBox();
        this.selectInbox();
        break;
      case 'OUT-TRAY':
        this.outBox();
        this.selectOutbox();
        break;
      case 'COMPOSE-DOC':
        this.docModeInTray = false;
        this.docModeOutTray = false;
        this.docModeComposeDoc = true;
        this.docModeReadDoc = false;
        this.docModeReplyDoc = false;
        break;
      case 'READ-DOC':

        this.getConversationObsv(this.clickedCommConversationID)
          .subscribe((ret: any) => {
            console.log('subscribe/ret:', ret);
            console.log('this.svUser.currentUser;:', this.svUser.currentUser);
            this.UserData = this.svUser.currentUser.user_data[0];
            this.selectedMessage = ret.data.conversation;
            this.clickedCommConversationID = options.commconversation_id;
            this.docModeInTray = false;
            this.docModeOutTray = false;
            this.docModeComposeDoc = false;
            this.docModeReadDoc = true;
            this.docModeReplyDoc = false;
          });

        break;
      case 'REPLY-DOC':
        this.getConversationObsv(options.commconversation_id)
          .subscribe((ret: any) => {
            console.log('getConversationObsv/subscribe/ret:', ret);
            console.log('this.svUser.currentUser;:', this.svUser.currentUser);
            this.UserData = this.svUser.currentUser.user_data[0];
            this.selectedMessage = ret.data.conversation;
            this.clickedCommConversationID = options.commconversation_id;
            this.subscribers = ret.data.subscribers;
            this.docModeInTray = false;
            this.docModeOutTray = false;
            this.docModeComposeDoc = false;
            this.docModeReadDoc = false;
            this.docModeReplyDoc = true;
          });

        break;
    }
  }

  inBox() {
    this.ConversationInboxObsv()
      .subscribe((ret: any) => {
        console.log('subscribe/ret:', ret);
        this.conversation = ret.data.conversation;
        this.InBoxData = ret.data.conversation;
        this.countInBox = this.InBoxData.length;
        this.docModeInTray = true;
        // this.docModeOutTray = false;
        this.docModeComposeDoc = false;
        this.docModeReadDoc = false;
        this.docModeReplyDoc = false;
        this.updateUnread();
      });
  }

  outBox() {
    this.ConversationOutBoxObsv()
      .subscribe((ret: any) => {
        console.log('subscribe/ret:', ret);
        this.conversation = ret.data.conversation;
        this.OutBoxData = ret.data.conversation;
        this.countOutBox = this.OutBoxData.length;
        this.docModeInTray = true;
        // this.docModeOutTray = false;
        this.docModeComposeDoc = false;
        this.docModeReadDoc = false;
        this.docModeReplyDoc = false;
      });
  }

  ConversationInboxObsv() {
    console.log('starting ConversationInboxObsv()');
    this.setEnvelopeConversationInbox();
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }


  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "ConversationInbox",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "memo_type_id": 4
  //                 }
  //             }
  //         ],
  //         "token": "40054DD8-0A49-E008-B529-8DA674AD8542"
  //     },
  //     "args": null
  // }
  setEnvelopeConversationInbox() {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'ConversationInbox',
      dat: {
        f_vals: [
          {
            data: {
              memo_type_id: 4
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  getConversationObsv(commconversationID) {
    console.log('starting getConversationObsv()');
    this.setEnvelopeGetConversation(commconversationID);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server
    */
    return this.svServer.proc(this.postData);
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionGetConversation",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "memo_type_id": 4,
  //                     "commconversation_id": 99
  //                 }
  //             }
  //         ],
  //         "token": "40054DD8-0A49-E008-B529-8DA674AD8542"
  //     },
  //     "args": null
  // }
  setEnvelopeGetConversation(commconversationID) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionGetConversation',
      dat: {
        f_vals: [
          {
            data: {
              memo_type_id: 4,
              commconversation_id: commconversationID
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  demoSelectedConversation() {
    const conv = this.conversation;
    return conv.filter((conv: ConversationItem) => {
      if (conv.commconversation_id == this.clickedCommConversationID) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  /*
  * for initializing conversation eg new chat or new memo
  * otherwise use sendComm() to reply or contributng to existing conversation
  * works for any communication eg chat, memo, doc comments
  * 
  */
  initCommObsv(initCommData: CommData) {
    console.log('starting getConversationObsv()');
    this.setEnvelopeInitComm(initCommData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionInitComm",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "subject": "fgve",
  //                 "commconversationsub": [
  //                     {
  //                         "user_id": 1010,
  //                         "sub_type_id": 1
  //                     },
  //                     {
  //                         "user_id": 1002,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1003,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1011,
  //                         "sub_type_id": 3
  //                     },
  //                     {
  //                         "user_id": 1015,
  //                         "sub_type_id": 4
  //                     }
  //                 ],
  //                 "data": {
  //                     "memo_message": "hujk gfr",
  //                     "attachment_id": null,
  //                     "memo_type_id": 4,
  //                     "memo_draft": null
  //                 }
  //             }
  //         ],
  //         "token": "9EA92E8F-AECC-559F-DBCC-BE66BE272FE8"
  //     },
  //     "args": null
  // }
  setEnvelopeInitComm(initCommData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionInitComm',
      dat: {
        f_vals: [
          initCommData
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  /*
  * for flaging memo as 'read'
  */
  flagOpenMemoObsv(docID) {
    console.log('starting flagOpenMemoObsv()');
    this.setEnvelopeFlagOpenMemo(docID);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }
  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionFlagOpenMemo",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "doc_id": 10258
  //                 }
  //             }
  //         ],
  //         "token": "050D1CF3-BFCB-1B99-80A2-501FECEFF53C"
  //     },
  //     "args": null
  // }
  setEnvelopeFlagOpenMemo(docID) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionFlagOpenMemo',
      dat: {
        f_vals: [
          {
            "data": {
              "doc_id": docID
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  /*
  * for initializing conversation eg new chat or new memo
  * otherwise use sendComm() to reply or contributng to existing conversation
  * works for any communication eg chat, memo, doc comments
  * 
  */
  replyCommObsv(replyCommData: CommData) {
    console.log('starting getConversationObsv()');
    this.setEnvelopeReplyComm(replyCommData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionInitComm",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "subject": "fgve",
  //                 "commconversationsub": [
  //                     {
  //                         "user_id": 1010,
  //                         "sub_type_id": 1
  //                     },
  //                     {
  //                         "user_id": 1002,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1003,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1011,
  //                         "sub_type_id": 3
  //                     },
  //                     {
  //                         "user_id": 1015,
  //                         "sub_type_id": 4
  //                     }
  //                 ],
  //                 "data": {
  //                     "memo_message": "hujk gfr",
  //                     "attachment_id": null,
  //                     "memo_type_id": 4,
  //                     "memo_draft": null
  //                 }
  //             }
  //         ],
  //         "token": "9EA92E8F-AECC-559F-DBCC-BE66BE272FE8"
  //     },
  //     "args": null
  // }
  setEnvelopeReplyComm(replyCommData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionReplyComm',
      dat: {
        f_vals: [
          replyCommData
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  ConversationOutBoxObsv() {
    console.log('starting ConversationOutBoxObsv()');
    this.setEnvelopeConversationOutBox();
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "ConversationInbox",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "memo_type_id": 4
  //                 }
  //             }
  //         ],
  //         "token": "40054DD8-0A49-E008-B529-8DA674AD8542"
  //     },
  //     "args": null
  // }
  setEnvelopeConversationOutBox() {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionOutBox',
      dat: {
        f_vals: [
          {
            data: {
              memo_type_id: 4
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }
}
