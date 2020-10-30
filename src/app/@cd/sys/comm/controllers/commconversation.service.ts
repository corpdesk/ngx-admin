import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { from } from 'rxjs';
import { ServerService } from '../../moduleman/controller/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';
import { DocModeOpts, ConversationItem, ConversationMeta, CommConversationSub } from '../models/comm.model';


@Injectable({
  providedIn: 'root'
})
export class CommconversationService {
  UserData;
  postData;
  conversation: ConversationItem[] = [
    {
      commconversation_id: 2618,
      doc_id: 8631,
      attended: false,
      selected: false,
      sender_name: "Cambridge Mdlalose",
      sender_email: "cambridge.mdlalose@cambridge.uk.co",
      flag: null,
      subject: "KoSEA and ILO virtual interim research workshop",
      memo_message: "<p>Hi Karl,</p><p>Below are some repair considerations:<br></p><h5 class=\"title\">Table Repair Considerations</h5>\n\n\n\n\n\n\n<p>\n          <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/repair-table.html\" title=\"13.7.3.5&nbsp;REPAIR TABLE Syntax\"><code class=\"literal\">REPAIR TABLE</code></a> upgrades a table\n          if it contains old temporal columns in pre-5.6.4 format\n          (<a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/time.html\" title=\"11.3.2&nbsp;The TIME Type\"><code class=\"literal\">TIME</code></a>,\n          <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/datetime.html\" title=\"11.3.1&nbsp;The DATE, DATETIME, and TIMESTAMP Types\"><code class=\"literal\">DATETIME</code></a>, and\n          <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/datetime.html\" title=\"11.3.1&nbsp;The DATE, DATETIME, and TIMESTAMP Types\"><code class=\"literal\">TIMESTAMP</code></a> columns without\n          support for fractional seconds precision) and the\n          <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_avoid_temporal_upgrade\"><code class=\"literal\">avoid_temporal_upgrade</code></a> system\n          variable is disabled. If\n          <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_avoid_temporal_upgrade\"><code class=\"literal\">avoid_temporal_upgrade</code></a> is\n          enabled, <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/repair-table.html\" title=\"13.7.3.5&nbsp;REPAIR TABLE Syntax\"><code class=\"literal\">REPAIR TABLE</code></a> ignores\n          the old temporal columns present in the table and does not\n          upgrade them.\n        </p><p>\n          To upgrade tables that contain such temporal columns, disable\n          <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_avoid_temporal_upgrade\"><code class=\"literal\">avoid_temporal_upgrade</code></a> before\n          executing <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/repair-table.html\" title=\"13.7.3.5&nbsp;REPAIR TABLE Syntax\"><code class=\"literal\">REPAIR TABLE</code></a>.\n        </p><p>\n          You may be able to increase <a class=\"link\" href=\"https://dev.mysql.com/doc/refman/8.0/en/repair-table.html\" title=\"13.7.3.5&nbsp;REPAIR TABLE Syntax\"><code class=\"literal\">REPAIR\n          TABLE</code></a> performance by setting certain system\n          variables. See <a class=\"xref\" href=\"https://dev.mysql.com/doc/refman/8.0/en/repair-table-optimization.html\" title=\"8.6.3&nbsp;Optimizing REPAIR TABLE Statements\">Section&nbsp;8.6.3, “Optimizing REPAIR TABLE Statements”</a>.\n</p>",
      attachment: true,
      doc_date: "6.10 AM"
    },
    {
      commconversation_id: 2619,
      doc_id: 8631,
      attended: false,
      selected: true,
      sender_name: "WOCCU",
      sender_email: "info@woccu.org",
      flag: { state: "warnig", label: "Client" },
      subject: "CAP Project Expansion Ipsum",
      memo_message: "Dear Sirs <br>I shall be obliged if you will send me the following books by VPP at your earliest convenience:<br>1. The Morning of the World, by Graham Cooper<br>2. In Search of Peace, by Neil Richards<br>3. The Ape and You, by Brian Darwin<br><br>Yours Sincerely<br>John Mathews  ",
      attachment: false,
      doc_date: "6.10 AM"
    },
    {
      commconversation_id: 2620,
      doc_id: 8632,
      attended: false,
      selected: false,
      sender_name: "Grace Waitsera",
      sender_email: "grace.waitsera@accosca.co.ke",
      flag: null,
      subject: "Foundation Launches Free Disaster Recovery App for Credit Unions",
      memo_message: "<p>My dear Fanny,</p><p>I had a slight return of fever last night, which terminated favorably, and I am now tolerably well, though week from the small quantity of food to which I am obliged to confine myself: I am sure a mouse would starve upon it. Mrs. Wylie came yesterday. I have a very pleasant room for a sick person. A sofa bed is made up for me in the front parlor which looks on to the grass plot. How much more comfortable than a dull room upstairs, where one gets tired of the pattern of the bed curtains! Besides I see all that passes –for instance now, this morning – if I had been in my own room I should not have seen the coals brought in. On Sunday between the hours of twelve and one I descried a Pot boy. Then goes by a fellow with a wooden clock under his arm that strikes a hundred and more. Then comes the old French emigrant with his hands joined behind on his hips, and his face full of political schemes. Then passes Mr David Lewis, a very good natured, good-looking old gentleman, who has been very kind to Tom and George and me. As for those fellows the Brick makers they are always passing to and fro. I must not forget the two old maiden Ladies in Well Walk who have a Lap dog between them that they are very anxious about. It is a corpulent little beast whom it is necessary to coax along with an ivory-tipp’d cane. Carlo our neighbor Mrs. Brawn’s dog and it meet sometimes. Lappy thinks Carlo a devil of a fellow and so do his mistresses. You shall hear from me again the day after tomorrow.</p><p>This is a letter written by famous English poet John Keats to Fanny Brawne whom he wanted to marry but could not due to his illness.</p>Yours Affectionately,<br>John Keats<br>",
      attachment: false,
      doc_date: "6.18 AM"
    },
    {
      commconversation_id: 2621,
      doc_id: 8633,
      attended: true,
      selected: false,
      sender_name: "Accounts Dept",
      sender_email: "accounts@accosca.co.ke",
      flag: null,
      subject: "Invoice",
      memo_message: "Dear Sirs",
      attachment: false,
      doc_date: "Jan 16"
    },
    {
      commconversation_id: 2622,
      doc_id: 8634,
      attended: true,
      selected: false,
      sender_name: "Alex T.",
      sender_email: "alex.tony@accosca.co.ke",
      flag: { state: "danger", label: "Documents" },
      subject: "Lorem ipsum dolor noretek imit set.",
      memo_message: "Dear Sirs",
      attachment: true,
      doc_date: "Mar 22"
    },
    {
      commconversation_id: 2623,
      doc_id: 8635,
      attended: true,
      selected: false,
      sender_name: "Monica Ryther",
      sender_email: "monica.ryther@accosca.co.ke",
      flag: null,
      subject: "The standard chunk of Lorem Ipsum used.",
      memo_message: "Dear Sirs",
      attachment: false,
      doc_date: "Dec 22"
    },
    {
      commconversation_id: 2624,
      doc_id: 8636,
      attended: true,
      selected: false,
      sender_name: "Sandra Derick",
      sender_email: "sandra.derick@accosca.co.ke",
      flag: null,
      subject: "Contrary to popular belief.",
      memo_message: "Dear Sirs",
      attachment: false,
      doc_date: "Jun 12"
    },
    {
      commconversation_id: 2625,
      doc_id: 8637,
      attended: true,
      selected: false,
      sender_name: "Patrick Pertners",
      sender_email: "patrick.pertners@accosca.co.ke",
      flag: { state: "info", label: "Adv" },
      subject: "If you are going to use a passage of Lorem",
      memo_message: "Dear Sirs",
      attachment: false,
      doc_date: "Mar 28"
    },
    {
      commconversation_id: 2626,
      doc_id: 8638,
      attended: true,
      selected: false,
      sender_name: "Michael Fox",
      sender_email: "michael.fox@accosca.co.ke",
      flag: null,
      subject: "Humour, or non-characteristic words etc.",
      memo_message: "Dear Sirs",
      attachment: false,
      doc_date: "May 28"
    },
    {
      commconversation_id: 2627,
      doc_id: 8639,
      attended: true,
      selected: false,
      sender_name: "Damien Ritz",
      sender_email: "damein.ritz@accosca.co.ke",
      flag: null,
      subject: "Oor Lorem Ipsum is that it has a more-or-less normal.",
      memo_message: "Dear Sirs",
      attachment: false,
      doc_date: "Dec 9"
    },
    {
      commconversation_id: 2628,
      doc_id: 8640,
      attended: true,
      selected: false,
      sender_name: "Anna Smith",
      sender_email: "anna.smith@accosca.co.ke",
      flag: null,
      subject: "Lorem ipsum dolor noretek imit set.",
      memo_message: "Dear Sirs",
      attachment: true,
      doc_date: "Jun 11"
    }
  ];
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
  docModeComposeDoc = false;
  docModeReadDoc = false;
  clickedCommConversationID = -1;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    public svUser: UserService,
  ) {
    this.IntrayMeta.pageHeader = "View Message";

  }



  setMode(docMode, options: DocModeOpts) {
    console.log('this.conversation:', this.conversation);
    switch (docMode) {
      case 'IN-TRAY':
        this.docModeInTray = true;
        this.docModeComposeDoc = false;
        this.docModeReadDoc = false;
        break;
      case 'COMPOSE-DOC':
        this.docModeInTray = false;
        this.docModeComposeDoc = true;
        this.docModeReadDoc = false;
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
            this.docModeComposeDoc = false;
            this.docModeReadDoc = true;
          });

        break;
    }
  }

  ConversationInboxObsv() {
    console.log('starting ConversationInboxObsv()');
    this.setEnvelopeConversationInbox();
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server
    */
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
}
