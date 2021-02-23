import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';
import { DocModeOpts, ConversationItem } from '../../../@cd/sys/comm/models/comm.model';
import { MessagesService } from '../../../@cd/sys/comm/controllers/messages.service';
import { SocketIoService } from '../../../@cd/sys/cd-push/controllers/socket-io.service';

@Component({
  selector: 'ngx-intray',
  templateUrl: './intray.component.html',
  styleUrls: ['./intray.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class IntrayComponent implements OnInit {
  messages;
  // OutBoxData = [];
  // InBoxData = [];
  // InBoxDataPush = [];

  constructor(
    public svConversation: CommconversationService,
    public svMesseges: MessagesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private svSocket: SocketIoService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.svConversation.init();
    console.log('this.svSocket.listen(push-memo');
    this.svSocket.listen('push-memo').subscribe((data: any) => {
      console.log('IntrayComponent/Push received');
      console.log('data:', data);
      this.reloadData(data)
    });
  }

  render() {
    const memoList = this.elementRef.nativeElement.querySelector('#memoList') as HTMLElement;
    let htmlHeader = '';
    htmlHeader += `<tr id="xx" [class]="docAttended(item.attended)">
                      <td class="check-mail">
                        <input type="checkbox" class="i-checks">
                      </td>
                      <td class="mail-ontact"><a>hduej</a></td>
                      <td (click)="rowSelect(dffg)"
                        class="mail-subject"><a>dfg</a></td>
                      <td class=""><i *ngIf="hasAttachment(item)" class="fa fa-paperclip"></i></td>
                      <td class="text-right mail-date">fghj</td>
                    </tr>`;

    memoList.insertAdjacentHTML('afterbegin', htmlHeader);
  }

  reloadData(data) {
    //this.svConversation.conversation = data;
    // this.svConversation.conversation = [];
    // this.svConversation.conversation = [...this.svConversation.conversation];
    this.svConversation.InBoxData.push(data);
    this.svConversation.InBoxData.sort(this.svConversation.dynamicSort('-memo_id'));
    // this.InBoxData = this.svConversation.InBoxData;
    this.svConversation.InBoxDataPush = this.svConversation.InBoxData;
    this.svConversation.trayMode = 3;
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

  docAttended(attended) {
    if (attended) {
      return 'read';
    } else {
      return 'unread';
    }
  }

  hasAttachment(item: ConversationItem) {
    if (item.attachment) {
      return true;
    } else {
      return false;
    }
  }

  identify(index, item) {
    return item.memo_id;
  }

}
