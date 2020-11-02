import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue} from '@angular/platform-browser';
import { DocModeOpts, ConversationItem } from '../../../@cd/sys/comm/models/comm.model';
import { SanitizeHtmlPipe } from '../../../@cd/guig/sanitize-html.pipe';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';

@Component({
  selector: 'ngx-doc-thread',
  templateUrl: './doc-thread.component.html',
  styleUrls: ['./doc-thread.component.scss']
})
export class DocThreadComponent implements OnInit {
  Conversation: ConversationItem[];
  // public sanitizeHtml: SanitizeHtmlPipe;
  trustedDashboardUrl : SafeUrl;
  trustedValue : SafeValue;
  constructor(
    private sanitizer: DomSanitizer,
    public svConversation: CommconversationService,
    ) {
    this.Conversation = this.svConversation.selectedMessage;
  }

  ngOnInit(): void {
  }

  getMessage(messageData: ConversationItem){
    this.trustedValue = this.sanitizer.bypassSecurityTrustHtml(messageData.memo_message);
    return this.trustedValue;
  }

}
