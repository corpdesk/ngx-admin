import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { TD } from '../cute-table/cute.table.model';

@Component({
  selector: 'ngx-cute-table-td',
  templateUrl: './cute-table-td.component.html',
  styleUrls: ['./cute-table-td.component.scss']
})
export class CuteTableTdComponent implements OnInit {
  @Input() tD: TD;
  constructor(
    private el: ElementRef,
    private svElem: HtmlElemService,
    ) { 

  }

  ngOnInit(): void {
    this.setup()
  }

  public setup() {
    if (this.tD) {
      this.el.nativeElement.classList.add(this.tD.class);
      const htmlContent = this.content(this.tD.class, this.tD.data);
      this.svElem.appendHtml(this.el, '#' + this.tD.id, htmlContent);
    }
  }

  content(cls, data) {
    let ret = '';
    switch (cls) {
      case 'project-status':
        ret = '<span class="label label-default">' + data.status + '</span>';
        break;
      case 'project-title':
        ret =  '<a href="project_detail.html">' + data.titile + '</a>'
        ret += '<br/>'
        ret += '<small>' + data.date + '</small>';
        break;
      case 'project-completion':
        ret =  '<small>Completion with: ' + data.percnt + '%</small>'
        ret += '<div class="progress progress-mini">'
        ret += '<div style="width: ' + data.percnt + '%;" class="progress-bar"></div>';
        ret += '</div>';
        break;
      case 'project-people':
        data.avatars.forEach((a) => {
          ret += '<a href="#"><img alt="image" class="rounded-circle" src="' + a.location + '"></a>';
        });
        break;
      case 'project-actions':
        data.actions.forEach((a) => {
          ret += '<a href="#" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> ' + a.label + ' </a>';
        });
        break;
    }
  }

}
