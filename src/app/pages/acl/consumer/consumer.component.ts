import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../../@cd/sys/moduleman/controllers/consumer.service';

@Component({
  selector: 'ngx-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  linearMode = true;
  constructor(
    public svConsumer: ConsumerService,
  ) { }

  ngOnInit(): void {
  }

  subscribeModule(){
    
  }

}
