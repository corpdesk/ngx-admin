
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { CommConversationSub, CommData } from '../../../@cd/sys/comm/models/comm.model';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { User } from '../../../@cd/sys/user/models/user-model';
// import { SocketIoService } from '../../../@cd/sys/cd-push/controllers/socket-io.service';

@Component({
  selector: 'ngx-compose-doc',
  templateUrl: './compose-doc.component.html',
  styleUrls: ['./compose-doc.component.scss']
})
export class ComposeDocComponent implements OnInit, AfterViewInit {
  htmlContent;
  editor;
  frmMemo: FormGroup;
  pushRecepients = [];
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
    // private svSocket: SocketIoService,
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
    console.log('this.svUser.currentUser.user_id:', this.svUser.currentUser.user_id);
    console.log('this.svUser.currentUser:', this.svUser.currentUser);
    this.convSubscribers = [];
    let sub: CommConversationSub = {
      user_id: this.svUser.currentUser.user_data[0].user_id,
      sub_type_id: 1 // sender
    };

    this.convSubscribers.push(sub);
    this.pushRecepients.push(sub)
    console.log('sub:', sub);

    this.selectedTo.forEach((user: User) => {
      console.log('Before: sub:', sub);
      sub = {
        user_id: user.user_id,
        sub_type_id: 7
      };
      this.convSubscribers.push(sub);
      this.pushRecepients.push(sub);
      console.log('After: sub:', sub);
    });

    this.selectedCc.forEach((user: User) => {
      console.log('Before: sub:', sub);
      sub = {
        user_id: user.user_id,
        sub_type_id: 3
      };
      this.convSubscribers.push(sub);
      this.pushRecepients.push(sub);
      console.log('After: sub:', sub);
    });

    this.selectedBcc.forEach((user: User) => {
      console.log('Before: sub:', sub);
      sub = {
        user_id: user.user_id,
        sub_type_id: 4
      };
      this.convSubscribers.push(sub);
      this.pushRecepients.push(sub);
      console.log('After: sub:', sub);
    });
  }


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
      data: {
        memo_message: msg,
        attachment_id: null,
        memo_type_id: 4,
        memo_draft: null
      }
    };
    this.svConversation.initCommObsv(initCommData)
      .subscribe((ret: any) => {
        console.log('ret.data:', ret.data);
        // PUSH NOTIFICATIONS/UPDATES
        // if success, emit to push server
        // login to conversation room
        // emit data
        
        const pushEnvelop = {
          pushRecepients: this.convSubscribers,
          emittEvent: 'push-memo',
          pushData: ret.data.outBox.conversation[0],
          req: this.svConversation.getEnvelopeInitComm(initCommData),
          resp: ret
        };
        console.log('pushEnvelop:', pushEnvelop);
        this.svConversation.pushData('send-memo', pushEnvelop);
      });
  }

}
