
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { DocModeOpts, ConversationItem, CommConversationSub, CommData } from '../../../@cd/sys/comm/models/comm.model';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { User } from '../../../@cd/sys/user/models/user-model';
// import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { MatChipInputEvent } from '@angular/material/chips';

// export interface Fruit {
//   name: string;
// }

@Component({
  selector: 'ngx-compose-doc',
  templateUrl: './compose-doc.component.html',
  styleUrls: ['./compose-doc.component.scss']
})
export class ComposeDocComponent implements OnInit, AfterViewInit {
  htmlContent;
  editor;
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
    this.svUser.getUsersObsv()
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
    // this.frmRegMenu = this.fb.group({
    //   menu_name: ['', Validators.required],
    //   menu_description: ['',],
    //   menu_icon: ['', Validators.required],
    //   icon_type: ['', Validators.required],
    // });
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
    console.log('this.svUser.currentUser.user_id:', this.svUser.currentUser.user_id);
    console.log('this.svUser.currentUser:', this.svUser.currentUser);
    let sub: CommConversationSub = {
      user_id: this.svUser.currentUser.user_data[0].user_id,
      sub_type_id: 1 // sender
    };

    this.convSubscribers.push(sub);
    console.log('sub:', sub);

    this.selectedTo.forEach((user: User) => {
      console.log('Before: sub:', sub);
      sub = {
        user_id: user.user_id,
        sub_type_id: 7
      };
      this.convSubscribers.push(sub);
      console.log('After: sub:', sub);
    });

    this.selectedCc.forEach((user: User) => {
      console.log('Before: sub:', sub);
      sub = {
        user_id: user.user_id,
        sub_type_id: 3
      };
      this.convSubscribers.push(sub);
      console.log('After: sub:', sub);
    });

    this.selectedBcc.forEach((user: User) => {
      console.log('Before: sub:', sub);
      sub = {
        user_id: user.user_id,
        sub_type_id: 4
      };
      this.convSubscribers.push(sub);
      console.log('After: sub:', sub);
    });
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
  initComm(frm: FormGroup) {
    console.log('starting initComm(frm)');
    this.processSubscribers();
    console.log('sendComm/this.convSubscribers:', this.convSubscribers);
    const docSubject = frm.controls.doc_subject.value;
    console.log('frm.controls.doc_subject.value:', frm.controls.doc_subject.value);
    const msg = this.htmlContent;

    const initCommData: CommData = {
      subject: docSubject,
      commconversationsub: this.convSubscribers,
      messageData: {
        memo_message: msg,
        attachment_id: null,
        memo_type_id: 4,
        memo_draft: null
      }
    };
    this.svConversation.initCommObsv(initCommData)
      .subscribe((ret: any) => {
        console.log('ret.data:', ret.data);
      });
  }


}
