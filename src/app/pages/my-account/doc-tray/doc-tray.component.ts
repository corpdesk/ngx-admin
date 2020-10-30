import { Component, OnInit } from '@angular/core';
import { CommconversationService } from '../../../@cd/sys/comm/controllers/commconversation.service';

@Component({
  selector: 'ngx-doc-tray',
  templateUrl: './doc-tray.component.html',
  styleUrls: ['./doc-tray.component.scss']
})
export class DocTrayComponent implements OnInit {
  
  constructor(
    public svConversation: CommconversationService,
  ) { }

  ngOnInit(): void {
  }

  

}
