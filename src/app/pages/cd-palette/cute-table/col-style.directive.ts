import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TD } from './cute.table.model';

@Directive({
  selector: '[ngxColStyle]'
})
export class ColStyleDirective {
  @Input('ngxColStyle') tD: TD;

  @HostListener('mouseenter') onMouseEnter() {
    this.setup(this.tD);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setup(this.tD);
  }
  constructor(private el: ElementRef) { }

  private setup(tD: TD) {
    if (tD) {
      this.el.nativeElement.classList.add(tD.class);
      let htmlContent = this.content(tD.class, tD.data);
    }
  }

  content(cls, data) {
    let ret = '';
    switch (cls) {
      case 'project-status':
        ret = '<span class="label label-default">' + data.status + '</span>';
        break;
      case 'project-title':
        ret =  '<a href="project_detail.html">' + data.title + '</a>'
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
          ret += '<a href="#" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> ' + a.action + ' </a>';
        });
        break;
    }
  }


}
