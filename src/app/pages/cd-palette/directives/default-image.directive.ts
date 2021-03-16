import { Directive, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Directive({
  selector: 'img[src]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()'
  }
})
export class DefaultImageDirective {
  @Input() src: string;
  public defaultImg: string = `${environment.USER_RESOURCES}/ooooooooo/avatar-01/a.jpg`;
  public onError() {
    this.src = this.defaultImg;
  }
  public checkPath(src) {
    return src ? src : this.defaultImg;
  }
}
