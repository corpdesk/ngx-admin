import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../../@cd/sys/moduleman/controller/modules.service';
import { CdModule } from '../../../@cd/sys/moduleman/model/module.model';
import { ConsumerService } from '../../../@cd/sys/moduleman/controller/consumer.service';
import { ConsumerResourceService } from '../../../@cd/sys/moduleman/controller/consumer-resource.service';
import { Consumer, ConsumerResource } from '../../../@cd/sys/moduleman/model/consumer.model';

@Component({
  selector: 'ngx-acl-consumer',
  templateUrl: './acl-consumer.component.html',
  styleUrls: ['./acl-consumer.component.scss']
})
export class AclConsumerComponent implements OnInit {
  linearMode = true;
  consumerResourceData = [];
  constructor(
    public svModule: ModulesService,
    public svConsumer: ConsumerService,
    public svConsumerResource: ConsumerResourceService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * 
    cd_obj_type_id?: number;//objId of module = 3
    enabled?: boolean;
    consumer_id?: number;
    obj_id?: number;
   */
  private setModuleData(consumer: Consumer) {
    this.svModule.selectedModules.forEach((module: CdModule) => {
      const consumerResource: any = { data:{}};
      consumerResource.data.cd_obj_type_id = 3;
      consumerResource.data.enabled = true;
      consumerResource.data.consumer_id = consumer.consumer_id;
      consumerResource.data.obj_id = module.module_id;
      this.consumerResourceData.push(consumerResource);
    });
  }

  /**
   * if muliple consumers are selected, 
   * build an array of consumerResourceData
   */
  setConsumerResourceData() {
    this.consumerResourceData = [];
    this.svConsumer.selectedConsumers.forEach((consumer: Consumer) => {
      this.setModuleData(consumer);
    });
  }

  
  subscribeModule(){
    console.log('starting subscribeModule()');
    this.setConsumerResourceData();
    console.log('this.svModule.selectedModules:', this.svModule.selectedModules);
    console.log('this.svConsumer.selectedConsumers:', this.svConsumer.selectedConsumers);
    console.log('this.consumerResourceData:', this.consumerResourceData);
    this.svConsumerResource.registerConsumerResourceObsv(this.consumerResourceData)
    .subscribe((resp)=>{
      console.log('subscribeModule()/resp:', resp);
    });
  }

}
