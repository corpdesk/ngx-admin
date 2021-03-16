import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { CommConversationSub, CommData } from '../../../@cd/sys/comm/models/comm.model';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { User } from '../../../@cd/sys/user/models/user-model';

@Component({
  selector: 'ngx-reply-doc',
  templateUrl: './reply-doc.component.html',
  styleUrls: ['./reply-doc.component.scss']
})
export class ReplyDocComponent implements OnInit, AfterViewInit {
  htmlContent;
  editor;
  IsBccRepy = false;
  frmMemo: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  fetchUserTo = 'getUsersObsv'; // server method for fetching
  fetchUserCc = 'getUsersObsv'; // server method for fetching
  fetchUserBcc = 'getUsersObsv'; // server method for fetching
  isInvalidSelTo = true;
  isInvalidSelCc = true;
  isInvalidSelBcc = true;
  selectedTo = [];
  selectedCc = [];
  selectedBcc = [];
  Users = [{}];
  nameField = 'username';
  IdField = 'user_id';

  convSubscribers: CommConversationSub[] = [];
  replySubscribers: any[] = [];


  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    theme: 'dark',
    zIndex: 2003,
  }


  constructor(
    private fb: FormBuilder,
    public svUser: UserService,
    public svConversation: CommconversationService,
  ) {
    this.svUser.getUsersObsv(null)
      .subscribe(
        (resp: any) => {
          console.log('UserSelectComponents::constructor()/resp.data:', resp.data);
          this.Users = resp.data;
        }
      );
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.frmMemo = this.fb.group({
      docTo: ['', Validators.required],
      docCc: ['', Validators.required],
      docBcc: ['', Validators.required],
      doc_subject: ['', Validators.required]
    });

  }

  ngAfterViewInit() {

    const editorToolBar = document.getElementsByClassName('angular-editor-toolbar');
    editorToolBar[0].setAttribute('style', 'background: rgb(43, 42, 42) !important; border: none;');
    //angular-editor-button
    const editorButtons = document.getElementsByClassName('angular-editor-button') as HTMLCollection;
    for (var i = 0; i < editorButtons.length; i++) {
      editorButtons[i].setAttribute('style', 'background: rgb(43, 42, 42) !important;color: #999999; border: none;');
    }

    // angular-editor-textarea
    // border: 1px solid #ddd;
    const editorTextArea = document.getElementsByClassName('angular-editor-textarea');
    editorTextArea[0].setAttribute('style', 'border: 1px solid rgb(100, 100, 100)');

  }

  initializeLink(controls) {
    controls.initialize();
    this.editor = controls.getEditor();
    console.log('this.editor:', this.editor);
  }

  getSelectedTo(SelTo) {
    console.log('SelTo:', SelTo);
    this.selectedTo = SelTo;
  }

  getSelectedCc(SelCc) {
    console.log('SelCc:', SelCc);
    this.selectedCc = SelCc;
  }

  getSelectedBcc(SelBcc) {
    console.log('SelBcc:', SelBcc);
    this.selectedBcc = SelBcc;
  }

  processSubscribers() {
    console.log('starting processSubscribers()');
    console.log('this.convSubscribers:', this.convSubscribers);
    this.convSubscribers = [];
    this.convSubscribers = this.svConversation.subscribers;
    this.setReplySubscribers();
  }

  // set original sender as recepient sub_type_id = 7;
  // set cuid as sub_type_id = 1;
  // all other cc remain as cc
  // all other bcc remain as bcc
  // if sender is bcc, then no other user is subscriber to the reply
  setReplySubscribers() {
    console.log('starting setReplySubscribers()');
    console.log('this.convSubscribers:', this.convSubscribers);
    console.log('this.svConversation.UserData.user_id:', this.svConversation.UserData.user_id);
    const cuid = this.svConversation.UserData.user_id;
    const convID = this.svConversation.selectedMessage[0].commconversation_id;
    this.replySubscribers = [];
    this.convSubscribers.forEach((s) => {
      console.log('s:', s);
      s.commconversation_id = convID;
      // set original sender as recepient sub_type_id = 7;
      if (s.sub_type_id == 1) {
        s.sub_type_id = 7;
      }

      // set cuid as sub_type_id = 1;
      if (s.user_id == cuid) {
        // if sender is bcc, then no other user is subscriber to the reply
        if (s.sub_type_id == 4) {
          this.IsBccRepy = true;
        }
        s.sub_type_id = 1;
      }


      this.replySubscribers.push(s);
    });

    // if sender is bcc, then no other user is subscriber to the reply
    if (this.IsBccRepy) {
      console.log('this.replySubscribers:', this.replySubscribers);
      this.replySubscribers = this.replySubscribers.filter((s) => {
        if (s.sub_type_id == 7 || s.sub_type_id == 1) {
          return true;
        }
      });
    }
  }

  replyComm(frm: FormGroup) {
    console.log('starting replyComm(frm)');
    this.processSubscribers();
    console.log('sendComm/this.convSubscribers:', this.convSubscribers);
    console.log('this.svConversation.selectedMessage:', this.svConversation.selectedMessage);
    const docSubject = frm.controls.doc_subject.value;
    console.log('frm.controls.doc_subject.value:', frm.controls.doc_subject.value);
    const msg = this.htmlContent;

    const replyCommData: CommData = {
      subject: this.svConversation.selectedMessage[0].subject,
      commconversationsub: this.replySubscribers,
      data: {
        memo_message: msg,
        attachment_id: null,
        memo_type_id: 9,
        memo_draft: null,
        commconversation_id: this.svConversation.selectedMessage[0].commconversation_id,
      }
    };
    this.svConversation.replyCommObsv(replyCommData)
      .subscribe((ret: any) => {
        console.log('ret.data:', ret.data);
      });
  }

}
